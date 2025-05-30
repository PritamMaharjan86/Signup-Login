import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTO_LOGOUT_TIME = 15 * 60 * 1000;

export default function AutoLogoutOff() {
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const logout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('loggedIn');
        navigate('/login');
    };

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(logout, AUTO_LOGOUT_TIME);
    };

    useEffect(() => {
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);

        resetTimer();

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return null;
}
