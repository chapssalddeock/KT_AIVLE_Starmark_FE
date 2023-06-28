import axios from 'axios';
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import useAuth from '../AuthHooks/useAuth';

const baseURL = 'http://kt-aivle.iptime.org:40170/api';

export const AXIOS = () => {
  const [serverTime, setServerTime] = useState(null);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/timestamp/`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setServerTime(response.data.timestamp);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${auth?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const isExpired = auth.access_expires - serverTime < 60;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/token/refresh2/`, {
        refresh: auth.refresh
      });

      const { access, access_expires } = response.data;
      const merge = { ...auth, access, access_expires };

      localStorage.setItem("TokenData", JSON.stringify(merge));

      setAuth(merge);

      req.headers.Authorization = `Bearer ${response.data.access}`;

      return req;
    } catch (error) {
      console.log(error);
    }
  });

  return axiosInstance;
};

















// import axios from 'axios';
// import dayjs from "dayjs";
// import useAuth from "../AuthHooks/useAuth";
// import { useEffect, useState } from "react";

// const baseURL = 'http://kt-aivle.iptime.org:40170/api';

// export const AXIOS = () => { 
//   const { auth, setAuth } = useAuth();
//   console.log(auth); 
//   const [serverTime, setServerTime] = useState(null);

//   useEffect(() => { // useEffect를 사용하여 비동기 요청을 수행
//     const fetchData = async () => { // 비동기 함수 내부에 async 키워드 사용
//       try {
//         const response = await axios.get(`${baseURL}/timestamp/`, {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
//         console.log(response.data.timestamp);
//         setServerTime(response.data.timestamp);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData(); // fetchData 함수 호출
//   }, []); // 빈 배열을 useEffect의 의존성 배열로 전달하여 한 번만 실행되도록 설정

//   // axios 기본 정보가 들어간 instance 생성
//   // auth token은 bearer token 형식으로 만들어서 보내준다
//   const axiosInstance = axios.create({
//       baseURL,
//       headers: { Authorization: `Bearer ${auth?.access}` } 
//   }); 
  
//   axiosInstance.interceptors.request.use(async req => {
//     const isExpired = auth.access_expires - serverTime < 60;
//     // const isExpired = true;
    
//     if (!isExpired) return req; // access token 허용

//     const response = await axios.post( `${baseURL}/token/refresh2/` , {
//       refresh : auth.refresh
//     });

//     const { refresh , refresh_expires} = auth;
//     const { access, access_expires} = response.data;
//     const merge = { access, access_expires, refresh, refresh_expires};

//     localStorage.setItem("TokenData", JSON.stringify(merge));

//     setAuth(merge);
//     console.log(response.data.access);

//     req.headers.Authorization = `Bearer ${response.data.access}`;

//     return req;
//   });

//   return axiosInstance;
// };
