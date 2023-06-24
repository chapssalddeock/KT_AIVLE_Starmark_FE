import axios from 'axios';
import { Alert } from 'antd';
import { useState, useRef } from 'react';
import { useRouter } from "next/router";
import useAuth from "../AuthHooks/useAuth";

let errorMessage = "";

export const AuthManager = () => {
    const router = useRouter();
    const { setAuth } = useAuth();
    const [visible, setVisible] = useState(true);

    const alertRef = useRef(null); // Alert 컴포넌트에 대한 ref 생성

    const handleClose = () => {
        setVisible(false);
    };

    const LogIn = async (values) => {
        let response;
        try {
            response = await axios.post('http://kt-aivle.iptime.org:40170/api/token2/', {
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

            // 로그인 에러시 텍스트 전달 (나중에 필히 수정)
            errorMessage = "Something went wrong!"; 
            setVisible(true); // Show the Alert component
            throw { error, message: temp }; 
        }

    };

    const EmailCheck = async (values) => {
        try {
            const response = await axios.post('http://kt-aivle.iptime.org:40170/api/email_check/', {
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
            const response = await axios.post('http://kt-aivle.iptime.org:40170/api/signup/', {
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

    const AlertComponent = () => (
      <div ref={alertRef}>
        
        <Alert
          message={errorMessage}
          type="error"
          closable
          afterClose={handleClose}
          showIcon
          style={{ display: visible ? 'block' : 'none' }}
        />
      
      </div>
    );



    

    return {
        LogIn,
        EmailCheck,
        Register,
        LogOut,
        AlertComponent,
    };

}

export default AuthManager;
