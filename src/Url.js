const Url = "https://10f8-2401-4900-1f3f-62a0-68c3-2fcc-31fc-2dd6.ngrok-free.app/";

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
