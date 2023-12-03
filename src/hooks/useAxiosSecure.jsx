import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://diagnostic-server-omega.vercel.app/"
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;