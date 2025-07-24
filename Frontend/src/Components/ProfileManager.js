import DeleteAccount from '../Components/DeleteAccount';
import ChangePassword from '../Components/ChangePassword';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfileManager = ({ isOpen, email }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        toast.success("Logging out!");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div className='w-1/5'>

            {isOpen && (
                <div className="mt-6 bg-white shadow-lg p-4 rounded-lg border border-gray-200">
                    <p><DeleteAccount email={email} /></p>
                    <p><ChangePassword email={email} /></p>
                    <p> <button onClick={handleLogout} className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"> Logout</button></p>
                </div>
            )}
        </div>
    );
};

export default ProfileManager;
