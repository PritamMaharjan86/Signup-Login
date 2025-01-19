import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";




function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    }

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        const getlogin = { ...login };
        getlogin[id] = value;
        setLogin(getlogin);
    }

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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)

            });
            const result = await response.json();
            const { success, error, jwtToken, name, message } = result;
            if (success) {
                toast.success("Access Granted");
                setTimeout(() => {
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedIn', name);
                    navigate('/home');
                }, 1000)
            }
            else {
                // If an error exists, show the error message from the server response
                if (message) {
                    toast.warning(message);
                } else if (error && error.details) {
                    const details = error.details[0].message;
                    toast.error(details);
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }
        }

        catch (err) {
            toast.error("All the fields are required to be filled!");
        }

    }


    return (
        <div>
            <div class="fixed inset-0 z-[-1] overflow-hidden">
                <div class="bg-layer1 absolute inset-0"></div>
                <div class="bg-layer2 absolute inset-0"></div>
                <div class="bg-layer3 absolute inset-0"></div>
            </div>
            <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg my-8">
                Login
            </h1>


            <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg m-10" onSubmit={handleLogin}>
                <div className="grid grid-cols-1 gap-5">
                    <ToastContainer />


                    <div className="relative w-full">
                        <MdOutlineAlternateEmail
                            className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                            size={16}
                        />
                        <input
                            className="block w-full pl-8 border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative w-full">

                        <TbLockPassword
                            className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                            size={16}
                        />
                        <input
                            className="block w-full pl-8 border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            {showPassword ? (<BiShowAlt size={16} />) : (<BiHide size={16} />)}
                        </button>
                    </div>

                    <div>

                        <button onSubmit={handleLogin} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mx-auto block m-5">
                            Login
                        </button>

                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <a href="/signup" className="text-blue-600 hover:text-blue-800 font-semibold ml-1">
                            Please signup here
                        </a>
                    </p>
                </div>
            </form>

        </div>
    )
}

export default Login
