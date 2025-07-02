import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AutoLogOff from '../Components/AutoLogOff';

function Home() {
    const [loggedIn, setLoggedIn] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(localStorage.getItem('loggedIn'));

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        toast.success("Logging out!");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 m-5">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
                Welcome, {loggedIn}
            </h1>
            <AutoLogOff />
            <ToastContainer />
            <button
                onClick={handleLogout}
                className="px-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            >
                Logout
            </button>
        </div>
    );
}

export default Home;
