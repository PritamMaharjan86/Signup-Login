import React from "react";
import { toast } from 'react-toastify';

function DeleteAccount({ email }) {


    const handleDelete = async () => {
        if (!email) {
            toast.error("Email is missing.");
            return;
        }

        try {
            const res = await fetch("https://signup-backend-2lfg.onrender.com/auth/delete-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Server error");
            } else {
                toast.success(data.message);
                // Clear user session and navigate to login
                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            }
        } catch (error) {
            toast.error("Network error or server is down");
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-700"
        >
            Delete Account
        </button>
    );
}

export default DeleteAccount;