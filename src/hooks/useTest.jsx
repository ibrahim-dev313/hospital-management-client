import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useTest = (id) => {
    // console.log(id);
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [testData, setTestData] = useState(null);

    const fetchTestDetails = async () => {
        try {
            const response = await axiosPublic.get(`/test/${id}`);
            // const { availableSlots } = response.data;
            setTestData(response.data);
            // console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching test details:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestDetails();
    }, [axiosPublic, id]);

    const refetch = () => {
        setLoading(true);
        fetchTestDetails();
    };

    return [testData, refetch, loading];
};

export default useTest;
