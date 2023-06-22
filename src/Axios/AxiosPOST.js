import axios from "./axios";

const DataPOST = async (endpoint, jsonFile, accessToken) => {
    try {
        let response;

        if(accessToken === '') {
            response = await axios.post(
                endpoint,
                JSON.stringify(jsonFile),
                {
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                }
            );
        } else {
            response = await axios.post(
                endpoint,
                JSON.stringify(jsonFile),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                }
            );
        }

        return response;

    } catch (err) {
        console.log(err);
        let errMsg;
        if (!err?.response) {
            errMsg = 'No Server Response';
        } else {
            errMsg = err.response;
        }
        return { error : errMsg};
    }

   
}

export default DataPOST;


