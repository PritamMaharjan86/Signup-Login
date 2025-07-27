import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AutoLogOff from '../Components/AutoLogOff';
import ProfileManager from '../Components/ProfileManager';

function Home({email}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

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

            </div>


            <ProfileManager isOpen={isOpen} toggleDropdown={toggleDropdown} email={email} />

            <AutoLogOff />
            <ToastContainer />
        </div>
    );
}

export default Home;
