import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAllReservations = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true)

    const { refetch, data: allReservations = [] } = useQuery({
        queryKey: ["allReservations"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reservations");
            if (res.data.length > 0) {
                // console.log(loading);
                setLoading(false)
                // console.log(res.data);
            }
            return res.data;
        },
    });

    return [allReservations, refetch, loading];
};

export default useAllReservations;
