import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";

const Logout = () => {

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
        <div className="mt-4">

            <button
                onClick={handleLogout}
                className="text-white flex items-center gap-3 mr-1"
            >
                <FiLogOut />
                Log Out
            </button>
        </div>
    )
}

export default Logout
