import axios from 'axios';
import jwt_decode from "jwt-decode"
import { useState, useRef } from 'react';

import { useRouter } from "next/router";
import useAuth from "../AuthHooks/useAuth";

let errorMessage = "";
const BASE_URL = "http://kt-aivle.iptime.org:40170/api";

const AuthManager = () => {
    const router = useRouter();
    const { setAuth } = useAuth();

    const LogIn = async (values) => {
        let response;
        try {
            response = await axios.post(`${BASE_URL}/token2/`, {
                email: values.email,
                password: values.password,
            }, {
                headers: { 'Content-Type': 'application/json' },
                //withCredentials: true, 이것이 없어야 cors 오류 발생 안함
            })
            
            // 로그인 성공하면 토큰 저장 및 service 페이지 이동
            setAuth(response.data);
            localStorage.setItem("TokenData", JSON.stringify(response.data));

            // 서비스 페이지로 이동
            router.push("/service");
        } catch (error) {
            const temp = error.response.data.error[0].message
            throw { error, message: temp }; 
        }

    };

    const EmailCheck = async (values) => {
        try {
            const response = await axios.post( `${BASE_URL}/email_check/`, {
                email: values,
            }, {
                headers: { 'Content-Type': 'application/json' },
                //withCredentials: true, 이것이 없어야 cors 오류 발생 안함
            })
        } catch (error) {
            let errMsg;
            if (!error?.response) {
                errMsg = error.message;
            } else {
                errMsg = error.response.data.error[0].message;
            }            
            throw { error, message: errMsg };
        }
    };

    const Register = async (values) => {
        try {
            const response = await axios.post( `${BASE_URL}/signup/` , {
                email: values.email,
                username: values.nickname,
                password: values.password,
                password2: values.confirm
            }, {
                headers: { 'Content-Type': 'application/json' },
                //withCredentials: true, 이것이 없어야 cors 오류 발생 안함
            })
        } catch (error) {  
            let errMsg;
            if (!error?.response) {
                errMsg = error.message;
            } else {
                errMsg = error.response.data.error[0].message;
            }            
            throw { error, message: errMsg };
        }
    }

    const LogOut = () => {
      setAuth(null);
      localStorage.removeItem("TokenData");
      router.push("/");
    }

    const UserInfo = () => {
        const getToken = localStorage.getItem("TokenData");
        const decodedValue = jwt_decode(JSON.parse(getToken).access);
        return decodedValue.username;

    }

    return {
        LogIn,
        EmailCheck,
        Register,
        LogOut,
        UserInfo
    };

}

export default AuthManager;
