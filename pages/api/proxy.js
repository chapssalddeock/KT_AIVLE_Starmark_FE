import axios from 'axios';

export default async (req, res) => {
  try {
    const { method, body, query, headers } = req;
    const url = 'http://kt-aivle.iptime.org:40170/api/token/'; // 프록시할 백엔드 서버 URL

    const response = await axios({
      method,
      url,
      data: body,
      params: query,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
};
