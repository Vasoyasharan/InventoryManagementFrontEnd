const Url = "https://a263-110-225-96-26.ngrok-free.app/";

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
