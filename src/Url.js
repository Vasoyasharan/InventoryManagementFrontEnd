const Url = "https://95cd-2409-40c1-101e-6542-4491-ea70-db1e-c6b5.ngrok-free.app/api";

let token = localStorage.getItem("token");

const headers = {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    token: token,
};

const config = {
    headers: headers,
};
export { Url, config };
