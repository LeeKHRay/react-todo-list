const keyName = "jwt_token";

const getAuthToken = () => localStorage.getItem(keyName);
export const setAuthToken = token => localStorage.setItem(keyName, token);
export const removeAuthToken = () => localStorage.removeItem(keyName);

export const getRequest = (url) => {
    const options = {
        method: "GET"
    };

    return fetcher(url, options);
};

export const postRequest = (url, data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetcher(url, options);
};

export const putRequest = (url, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetcher(url, options);
};

export const deleteRequest = (url) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetcher(url, options);
};

const fetcher = (url, options) => {
    const token = getAuthToken();
    if (token) {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, options);
}
