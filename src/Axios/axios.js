import axios from 'axios';

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

export default axios.create({
    baseURL : 'http://kt-aivle.iptime.org:40170'
});