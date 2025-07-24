import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AutoLogOff from '../Components/AutoLogOff';
import ProfileManager from '../Components/ProfileManager';

function Home() {
    const [loggedIn, setLoggedIn] = useState('');
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        setEmail(localStorage.getItem('email'));
        setLoggedIn(localStorage.getItem('loggedIn'));
    }, []);


    return (
        <div className="flex flex-col items-start justify-start p-2">
            <div className='flex flex-row justify-center items-center'>

                <button onClick={toggleDropdown}>
                    <img
                        className='w-12 h-12'
                        src='https://res.cloudinary.com/dedpvue13/image/upload/v1753342651/avatar_s3hqft.avif'
                        alt='Avatar'
                    />
                </button>

                <h1 className="text-xl font-bold text-gray-800 mb-2 m-2">Welcome, {loggedIn}</h1>

            </div>


            <ProfileManager isOpen={isOpen} toggleDropdown={toggleDropdown} email={email} />

            <AutoLogOff />
            <ToastContainer />
        </div>
    );
}

export default Home;
