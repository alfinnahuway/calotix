import { useState } from "react";
import Public from "../layouts/Public";
import axios from "axios"; // Import Axios for making API requests
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if password and confirmPassword match
            if (password !== confirmPassword) {
                alert("Password and Confirm Password do not match.");
                return;
            }

            // Construct the registration data
            const registrationData = {
                nama_depan: username, // Assuming "username" corresponds to the first name
                nama_belakang: "", // You can add the last name here if needed
                username: username,
                email: email,
                password: password,
            };

            // Send the registration data to the API
            const response = await axios.post(import.meta.env.VITE_REACT_APP_REGISTER_API_URL, registrationData);

            if (response.status === 201) {
                alert("Registration successful!");
                // Optionally, you can redirect the user to the login page after successful registration
                history("/login");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <Public>
            <div className="flex flex-col items-center justify-center my-18 bg-stone-950 text-stone-50">
                <h2 className="text-3xl text-orange-400 font-bold mb-6">Registrasi Di sini Gan</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-md gap-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            className="bg-transparent w-full border border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="bg-transparent w-full border border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="bg-transparent w-full border border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="bg-transparent w-full border border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-dark focus:outline-none focus:ring-orange"
                    >
                        Register
                    </button>
                </form>
            </div>
        </Public>
    );
};

export default RegisterForm;
