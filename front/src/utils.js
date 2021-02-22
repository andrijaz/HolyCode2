import axios from "axios";
const myAuthObject = {
    isAutheticated: localStorage.getItem("isAuth"),
    token: localStorage.getItem("access")
}
axios.interceptors.request.use(
    config => {
        if (myAuthObject.isAutheticated) {
            config.headers.authorization = `Bearer ${myAuthObject.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export async function executeApi(url, method="GET", data) {
    if (method.toUpperCase() === "GET") {
        try {
            return await axios({
                method: method,
                url: url,
                params: data
            }, {
                withCredentials: true
            })
        } catch (e) {
            console.error(e)
        }
    }
    try {
        return await axios({
            method: method,
            url: url,
            data: JSON.stringify(data)
        }, {
            withCredentials: true
        })
    } catch (e) {
        console.error(e)
    }

}