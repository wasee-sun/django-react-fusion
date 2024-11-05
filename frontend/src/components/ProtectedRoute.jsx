import {Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        auth();
    }, []);

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN); // find the r token
            const res = await api.post('api/token/refresh/',
                {refresh: refreshToken} // link and object to send
            );
            if (res.status === 200) { // success
                localStorage.setItem(ACCESS_TOKEN, res.data.access); // key value saved
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        }
    };

    const auth = async () => {
        try{
            const token = localStorage.getItem(ACCESS_TOKEN); // find the token
            if (token) {
                const decoded = jwtDecode(token); //decoding to get token expiration
                const tokenExpiration = decoded.exp; // in seconds
                const now = Date.now() / 1000; // converting to seconds from ms

                if(tokenExpiration < now) {
                    await refreshToken(); // call the refreshToken function and wait
                } else {
                    setIsAuthenticated(true);
                };
            } else {
                setIsAuthenticated(false);
                return
            };
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        };
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>
    };

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute