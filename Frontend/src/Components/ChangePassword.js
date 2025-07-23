import React, { useState } from "react";
import { toast } from "react-toastify";
import { BiHide, BiShowAlt } from "react-icons/bi";

function ChangePassword({ email }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    };


    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, oldPassword, newPassword }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setOldPassword("");
                setNewPassword("");
            }
        } catch (error) {
            toast.error("Server error");
        }
    };

    return (
        <div className="mt-4">



            <div className="relative w-full flex flex-row mb-2">
                <h2 className="text-lg font-semibold">Change Password</h2>
                <button
                    type="button"
                    onClick={PasswordVisible}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <BiShowAlt size={20} /> : <BiHide size={20} />}
                </button>

            </div>

            <input
                className="block w-full pl-10 border-b-4 p-3 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-base"
                type={showPassword ? 'text' : 'password'}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />


            <input
                className="block w-full pl-10 border-b-4 p-3 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-base"
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />


            <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
            >
                Update Password
            </button>
        </div>
    );
}

export default ChangePassword;
