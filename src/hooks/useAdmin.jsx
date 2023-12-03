import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setIsAdmin] = useState(false)
    const { data } = useQuery({
        queryKey: [user?.email, 'userType'],
        queryFn: async () => {
            // console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/user?email=${user.email}`);
            // console.log(res.data.userType);
            if (res.data.userType == 'admin') {
                setIsAdmin(true)
            } else if (res.data.userType == 'user') {
                setIsAdmin(false)
            }
            return res.data?.userType;
        }
    })
    return [isAdmin, loading, data]
};

export default useAdmin;