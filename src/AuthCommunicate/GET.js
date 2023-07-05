// useGET.js
import { useState } from 'react';
import { AXIOS } from './axios';

const useGET = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axiosInstance = AXIOS();

  const fetchData = async (endurl, config) => {
    try {
      const response = await axiosInstance.get(endurl, config);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return { data, error, fetchData };
};

export default useGET;



// 단독 선언하여 파라미터를 받아와 사용하는 것
// 사용하려면 함수를 여러번 선언해야함
// import { useEffect, useState } from 'react';
// import { AXIOS } from './axios';

// const useGET = (endurl, config) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const axiosInstance = AXIOS();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(endurl, config);
//         setData(response.data);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [endurl, config]);

//   return { data, error };
// };

// export default useGET;

// // GET.js  파라미터 없는 버전
// import { useEffect, useState } from 'react';
// import { AXIOS } from '../axios/Axios';

// const useGET = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const axiosInstance = AXIOS();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/bookmark');
//         setData(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { data, loading, error };
// };

// export default useGET;
