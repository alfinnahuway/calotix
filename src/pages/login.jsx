import { useState, useEffect } from "react";
import Public from "../layouts/Public";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const history = useNavigate();

    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("username"));

    useEffect(() => {
        // Save login info in local storage whenever the state values change
        if (rememberMe) {
            localStorage.getItem("isLoggedIn") === "true"
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        } else {
            localStorage.getItem("isLoggedIn") === "false"
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
    }, [username, password, rememberMe]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // For demonstration purposes, hardcoding credentials
        const validUsername = "zulzdn";
        const validPassword = "pass";

        if (username === validUsername && password === validPassword) {
            alert("Login successful!");

            // Redirect to the home page
            history("/");
        } else {
            alert("Invalid username or password. Please try again.");
        }
    };


    return (
        <Public>
            <div className="max-w-md mx-auto my-10 p-6  bg-stone-950 text-stone-50 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-stone-50">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600  focus:border-orange-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-stone-50">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600  focus:border-orange-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                className="mr-2"
                            />
                            <span className="text-stone-50">Remember Me</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-orange-600  focus:ring-orange-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </Public>
    );
};

export default LoginForm;
