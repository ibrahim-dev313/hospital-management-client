import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://diagnostic-server-mi1357.vercel.app"
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;