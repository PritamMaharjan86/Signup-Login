const bcrypt = require('bcryptjs');
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists.',
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful.",
            success: true
        });
    } catch (err) {
        console.error('Signup Error:', err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'User does not exist.',
                success: false
            });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: 'Authentication failed. Email or password is incorrect.',
                success: false
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful.",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        console.error('Login Error:', err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
