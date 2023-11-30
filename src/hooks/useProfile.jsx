import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProfile = () => {
    // tanstack query
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, data: userData = [] } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user.email}`)
            if (res.data.email) {
                // console.log(loading);
                setLoading(false)
            }

            return res.data

        }
    })
    return [userData, refetch, loading]
};
export default useProfile
