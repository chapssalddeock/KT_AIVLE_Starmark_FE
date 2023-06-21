import axios from "./axios";

const DataGET = async (endpoint, accessToken) => {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Handle response data here

    } catch (err) {
        console.log(err);
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Bad Request');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Request Failed');
        }
    }
};

export default DataGET;
