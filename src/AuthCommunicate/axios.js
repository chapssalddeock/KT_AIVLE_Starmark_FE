import axios from 'axios';
import { useRouter } from "next/router";
import useAuth from '../AuthHooks/useAuth';

const baseURL = 'http://kt-aivle.iptime.org:40170/api';

export const AXIOS = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${auth?.access}` }
  });

  const source = axios.CancelToken.source();

 axiosInstance.interceptors.request.use(async (req) => {
      try {
        const response = await axios.get(`${baseURL}/timestamp/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          cancelToken: source.token, // 취소 토큰 설정
        });
        const isExpired = auth.access_expires - response.data.timestamp < 60;

        if (!isExpired) return req;

        try {
          const response = await axios.post(`${baseURL}/token/refresh2/`, {
            refresh: auth.refresh
          }, {
            cancelToken: source.token, // 취소 토큰 설정
          });

          const { access, access_expires } = response.data;
          const merge = { ...auth, access, access_expires };

          localStorage.setItem("TokenData", JSON.stringify(merge));

          setAuth(merge);

          req.headers.Authorization = `Bearer ${response.data.access}`;

          return req;
        } catch (error) {
          router.push('/fail');
          throw error; // 에러 다시 던지기
        }
      } catch (error) {
        router.push('/fail');
        throw error;
      }
    });

  return axiosInstance;
};