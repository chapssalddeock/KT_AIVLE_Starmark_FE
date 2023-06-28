// usePOST.js
import { useEffect, useState } from 'react';
import { AXIOS } from './axios';

const usePOST = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axiosInstance = AXIOS();

  const fetchData = async (endurl, parameter) => {
    try {
      const response = await axiosInstance.post(endurl, parameter);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return { data, error, fetchData };
};

export default usePOST;