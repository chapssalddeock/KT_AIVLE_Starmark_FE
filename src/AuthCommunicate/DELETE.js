// useDELETE.js
import { useEffect, useState } from 'react';
import { AXIOS } from './axios';

const useDELETE = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axiosInstance = AXIOS();

  const fetchData = async (endurl, parameter) => {
    try {
      const response = await axiosInstance.delete(endurl, parameter);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return { data, error, fetchData };
};

export default useDELETE;