import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAllBanners = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true)

    const { refetch, data: allBanners = [] } = useQuery({
        queryKey: ["allBanners"],
        queryFn: async () => {
            const res = await axiosSecure.get("/banners");
            if (res.data) {
                // console.log(loading);
                setLoading(false)
            }
            return res.data;
        },
    });

    return [allBanners, refetch, loading];
};

export default useAllBanners;
