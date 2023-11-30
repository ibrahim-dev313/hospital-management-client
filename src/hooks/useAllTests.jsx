import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAllTests = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true)
    const loader = <>
        <div className='flex flex-col items-center justify-center min-h-screen gap-9'>
            <span className="flex items-center justify-center w-32 text-green-800 loading loading-bars "></span>

        </div>
    </>
    const { refetch, data: allTests = [] } = useQuery({
        queryKey: ["allTests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tests");
            setLoading(false)
            return res.data;
        },
    });

    return [allTests, refetch, loading, loader];
};

export default useAllTests;
