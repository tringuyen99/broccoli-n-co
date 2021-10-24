import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

/**
 * Fetch wrapper for our backend api
 * @param url
 * @param method
 * @param formData
 * @returns {Promise<Response | never>}
 */
export function apiFetch(url, method, formData) {
    let apiUrl = url;
    const data = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    if (!isEmpty(formData)) {
        if (method === 'GET') {
            apiUrl +=
                '?' +
                Object.keys(formData)
                    .map(key => key + '=' + formData[key])
                    .join('&');
        } else {
            data.data = formData;
        }
    }

    return axios(apiUrl, data)
        .catch(error => {
            console.log(error.response)
            throw error.response;
        });
}