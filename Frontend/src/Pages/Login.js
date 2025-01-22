import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [login, setLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const getLogin = { ...login };
        getLogin[id] = value;
        setLogin(getLogin);

        if (id === 'email') {
            validateEmailInput(value);
        }
    };

    const validateEmailInput = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError(false);
            setValidateEmail(false);
        } else if (emailRegex.test(email)) {
            setEmailError(false);
            setValidateEmail(true);
        } else {
            setEmailError(true);
            setValidateEmail(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = login;

        if (!email || !password) {
            toast.error("All the fields are required to be filled!");
            return;
        }

        try {
            const url = 'https://signup-backend-2lfg.onrender.com/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });
            const result = await response.json();
            const { success, error, jwtToken, name, message } = result;
            if (success) {
                toast.success("Access Granted");
                setTimeout(() => {
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedIn', name);
                    navigate('/home');
                }, 1000);
            } else {
                if (message) {
                    toast.warning(message);
                } else if (error && error.details) {
                    const details = error.details[0].message;
                    toast.error(details);
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div>
            <div className="fixed inset-0 z-[-1] overflow-hidden">
                <div className="bg-layer1 absolute inset-0"></div>
                <div className="bg-layer2 absolute inset-0"></div>
                <div className="bg-layer3 absolute inset-0"></div>
            </div>
            <div className="w-9/12 mx-auto p-6 bg-white shadow-lg rounded-2xl m-10 flex flex-row">

                <form className="w-1/2  p-2 bg-white m-5 " onSubmit={handleLogin}>
                    <h1 className="text-4xl font-extrabold text-black text-left drop-shadow-lg p-4">LogIn</h1>
                    <div className="grid grid-cols-1 gap-5">
                        <ToastContainer />
                        <div className="relative w-full">
                            <MdOutlineAlternateEmail
                                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                                size={16}
                            />
                            <input
                                className={`block w-full pl-8 border-b-4 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${emailError ? 'border-red-500' : validateEmail ? 'border-green-500' : 'border-gray-300'
                                    }`}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                            {emailError && <p className="text-red-500 text-sm mt-1">Invalid email format</p>}
                        </div>
                        <div className="relative w-full">
                            <TbLockPassword
                                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                                size={16}
                            />
                            <input
                                className="block w-full pl-8 border-b-4 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={PasswordVisible}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <BiShowAlt size={16} /> : <BiHide size={16} />}
                            </button>
                        </div>
                        <div>
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold p-1 w-40 rounded-3xl shadow-lg flex items-center justify-between">
                                <span className="ml-2 p-1">Login</span>
                                <button
                                    type="submit"
                                    className="rounded-full text-white font-bold p-2 bg-gradient-to-r from-blue-400 to-blue-500  hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 "
                                >
                                    <FaLongArrowAltRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a
                                href="/signup"
                                className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
                            >
                                Please signup here
                            </a>
                        </p>
                    </div>
                </form>
                <div className='h-80 w-80 mt-20 '>

                    <img src="https://res.cloudinary.com/dedpvue13/image/upload/v1737366683/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-sign-in-to-account-user-authorization-login-authentication-page-concept-png_q57jgi.webp" alt="image" />


                </div>
            </div>

        </div>
    );
}

export default Login;
