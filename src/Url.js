const Url = "https://inventory-management-node.onrender.com/api";

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
