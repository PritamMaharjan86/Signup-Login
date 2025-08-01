import { useState, useEffect } from 'react';
import DeleteAccount from '../Components/DeleteAccount';
import ChangePassword from '../Components/ChangePassword';
import Logout from '../Components/Logout';

const ProfileManager = ({ isOpen, toggleDropdown }) => {
    const [loggedIn, setLoggedIn] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem('email'));
        setLoggedIn(localStorage.getItem('loggedIn'));
    }, []);

    return (
        <div
            className={`
        fixed top-0 left-0 h-full w-72 bg-black shadow-lg border-r border-gray-600 z-50 rounded-tr-xl rounded-br-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
        >
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <img
                    className='w-10 h-10 rounded-full'
                    src='https://res.cloudinary.com/dedpvue13/image/upload/v1753342651/avatar_s3hqft.avif'
                    alt='Avatar'
                />    <p className="text-lg font-bold text-white">Welcome, {loggedIn}</p>
                <button
                    onClick={toggleDropdown}
                    className="text-white text-xl hover:text-red-500"
                >
                    ✕
                </button>
            </div>

            <div className="p-4 text-white">
                <div className="mb-4"><DeleteAccount email={email} /></div>
                <div className="mb-4"><ChangePassword email={email} /></div>
                <div><Logout /></div>
            </div>
        </div>
    );
};

export default ProfileManager;
