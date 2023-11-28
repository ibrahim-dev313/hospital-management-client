import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllTests = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: allTests = [] } = useQuery({
        queryKey: ["allTests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tests");
            return res.data;
        },
    });

    return [allTests, refetch];
};

export default useAllTests;
