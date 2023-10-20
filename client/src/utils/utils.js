const keyName = "authToken";

export const setAuthToken = token => localStorage.setItem(keyName, token);
export const getAuthToken = () => localStorage.getItem(keyName);

export const getRequest = url => fetch(url);

export const postRequest = (url, data) => fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});