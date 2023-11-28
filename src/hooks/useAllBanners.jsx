import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllBanners = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: allBanners = [] } = useQuery({
        queryKey: ["allBanners"],
        queryFn: async () => {
            const res = await axiosSecure.get("/banners");
            return res.data;
        },
    });

    return [allBanners, refetch];
};

export default useAllBanners;
