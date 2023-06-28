import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {      
        const getToken = localStorage.getItem("TokenData");
        if (getToken) {
            // 여기에다가 require Auth expires 확인
            // 만약 유효기간이 지났으면 localStorage, auth 모두 비움
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