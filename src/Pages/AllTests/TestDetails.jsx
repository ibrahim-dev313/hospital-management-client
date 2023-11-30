// TestDetailsPage.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAllTests from '../../hooks/useAllTests';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import BookModal from './BookModal';

const stripePromise = loadStripe(import.meta.env.VITE_PK)
const TestDetails = () => {
    const [, , loading, loader] = useAllTests()
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [modalLoading, setModalLoading] = useState(true)
    const [testData, setTestData] = useState(null);
    const [availableSlots, setAvailableSlots] = useState(0);
    const [bookingStatus, setBookingStatus] = useState('pending');

    useEffect(() => {
        const fetchTestDetails = async () => {
            try {
                const response = await axiosPublic.get(`/test/${id}`);
                const { availableSlots } = response.data; // Adjust based on your API response structure
                // console.log(response.data);
                setTestData(response.data);
                setAvailableSlots(availableSlots);
                setBookingStatus(status);
            } catch (error) {
                console.error('Error fetching test details:', error);
            }
        };

        fetchTestDetails();
    }, [axiosPublic, id]);


    return (
        <>
            {
                loading ? loader : <div className="m-8 card glass rounded-r-xl">
                    {testData && (
                        <div className='flex flex-row '>
                            <figure>
                                <img className='rounded-l-xl w-96' src={testData.testImage} alt={testData.testName} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{testData.testName}</h2>
                                <p>Test Date: {testData.testDate}</p>
                                <p>Available Slots: {availableSlots}</p>
                                <p> {testData.testDescription}</p>
                                {availableSlots > 0 && (
                                    <button className="font-bold uppercase bg-green-500 btn hover:bg-green-700" onClick={() => document.getElementById('my_modal_1').showModal()}>Book Now</button>

                                )}
                            </div>
                        </div>
                    )}


                    <Elements stripe={stripePromise}>
                        <BookModal testData={testData} loading={modalLoading} setLoading={setModalLoading}></BookModal>
                    </Elements>
                </div>
            }
        </>
    );
};

export default TestDetails;
