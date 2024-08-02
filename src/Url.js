const Url = "https://1bd7-2401-4900-1c80-4e60-df8-aa81-d6c-db2f.ngrok-free.app/";

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
