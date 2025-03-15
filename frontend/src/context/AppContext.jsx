import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";  // Import for navigation
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate(); // Navigation hook

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to fetch user data
    const getUserdata = async () => {
        const tokenExists = document.cookie.includes("token="); // ✅ Check if token exists
        if (!tokenExists) return;  // ✅ Don't send a request if no token
    
        try {
            const { data } = await axios.get(`${backendurl}/api/user/data`, { withCredentials: true });
    
            if (data.success) {
                setUserData(data.userData);
                setIsLoggedin(true);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                console.log("User not logged in.");
                setIsLoggedin(false);
                setUserData(null);
            } else {
                toast.error(error.response?.data?.message || "Failed to fetch user data");
            }
        }
    };
    

    // Function to log out the user
    const logoutUser = async () => {
        try {
            await axios.post(`${backendurl}/api/auth/logout`,{}, { withCredentials: true });

            setUserData(null);
            setIsLoggedin(false);
            navigate("/");

            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to log out. Try again.");
        }
    };

    useEffect(() => {
        getUserdata();
    }, []); // Runs only once when component mounts

    const value = {
        backendurl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserdata,
        logoutUser  // Make logoutUser available in context
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
