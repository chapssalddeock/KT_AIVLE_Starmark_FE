import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
const baseURL = 'http://kt-aivle.iptime.org:40170/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();    

    useEffect(() => {        
        const getToken = async () => {
            const tokenData = localStorage.getItem("TokenData");
            if (tokenData) {
                try {
                    const response = await axios.get(`${baseURL}/timestamp/`, {
                      headers: {
                        'Content-Type': 'application/json',
                      }
                    });

                    const isExpired = JSON.parse(tokenData).refresh_expires - response.data.timestamp < 60;

                    if (!isExpired) {
                        setAuth(JSON.parse(tokenData));
                    } else {
                        setAuth(null);
                        localStorage.removeItem("TokenData");
                        router.push("/");
                    }
                  } catch (error) {
                  }                
            }
        };
        getToken();
        setLoading(false);
    }, []);
    

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;