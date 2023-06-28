// GET.js
import React, { useEffect, useState } from 'react';
import { AXIOS } from './axios';

const GET = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = AXIOS();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/bookmark');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Display the retrieved data */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default GET;













//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await API.get(endpoint, config);
//         setResponse(res.data);
//       } catch (err) {
//         setError(err);
//       }
//     };
//     fetchData();
//   }, [API, endpoint, config]);

//   console.log(response);

//   return response; // 또는 필요에 따라 response를 반환할 수 있음


// import AXIOS from "./axios";

// const AxiosGET = async (endpoint, config) => {
//     const API = AXIOS();
//     try {
//         const response = await API.get(endpoint, config);
//         console.log(response);
//         return response.data;

//       } catch (error) {
//         console.log(error);
//         return error;
//       }
//     return null;
// };

// export default AxiosGET;




// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const FetchDataComponent = ({ url, config }) => {
//   const [responseData, setResponseData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url, config);
//         if (response.status === 200) {
//           setResponseData(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [url, config]);

//   return responseData;
// };

// export default FetchDataComponent;

