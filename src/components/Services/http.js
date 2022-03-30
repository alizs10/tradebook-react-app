import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";


// axios.interceptors.response.use(null,function (error) {
//     const expectedErrors = error.response &&
//         error.status >= 400 &&
//         error.status < 500;

//     if (!expectedErrors) {
//         console.log(error.status);
//         toast.error('خطای سرور', {
//             position: "top-right",
//             closeOnClick: true
//         });
//     }

//     return Promise.reject(error);
// });

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    
}


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}