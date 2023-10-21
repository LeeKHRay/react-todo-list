const keyName = "authToken";

export const setAuthToken = token => localStorage.setItem(keyName, token);
export const getAuthToken = () => localStorage.getItem(keyName);
export const removeAuthToken = () => localStorage.removeItem(keyName);

export const getRequest = (url) => {
    return fetcher(url, {});
};

export const postRequest = (url, data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetcher(url, options);
};

const fetcher = (url, options) => {
    const token = localStorage.getItem(keyName)
    if (token) {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, options);
}
