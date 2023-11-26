import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProfile = () => {
    // tanstack query
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, data: userData = [] } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    return [userData, refetch]
};
export default useProfile
