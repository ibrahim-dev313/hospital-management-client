// TestDetailsPage.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import useTest from '../../hooks/useTest';
import BookModal from './BookModal';

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const TestDetails = () => {

    const { id } = useParams();
    console.log(id);
    // Destructure values from useTest hook
    const [testData, refetch, loading] = useTest(id);

    const openModal = () => {
        document.getElementById('my_modal_1').showModal();
    };

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <div className="m-8 card glass rounded-r-xl">
                    {testData && (
                        <div className='flex flex-row '>
                            <figure>
                                <img className='h-full rounded-l-xl w-96' src={testData.testImage} alt={testData.testName} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{testData.testName}</h2>
                                <p>Test Date: {testData.testDate}</p>
                                <p>Available Slots: {testData.availableSlots}</p>
                                <p>{testData.testDescription}</p>
                                {testData.availableSlots > 0 && (
                                    <button className="font-bold uppercase bg-green-500 btn hover:bg-green-700" onClick={openModal}>Book Now</button>
                                )}
                            </div>
                        </div>
                    )}

                    <Elements stripe={stripePromise}>
                        <BookModal testData={testData} refetch={refetch} loading={loading} openModal={openModal} />
                    </Elements>
                </div>
            )}
        </>
    );
};

export default TestDetails;
