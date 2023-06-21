import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {      
        const getToken = localStorage.getItem("TokenData");
        if (getToken) {
            console.log("ifprovide");
            setAuth(JSON.parse(getToken));
        }
        setLoading(false);
    }, []);
    

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;