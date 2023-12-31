// TestDetailsPage.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { pageTitle } from '../../Functions/DynamicTitle';
import useProfile from '../../hooks/useProfile';
import useTest from '../../hooks/useTest';
import BookModal from './BookModal';

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const TestDetails = () => {

    const [userData, , profileLoading] = useProfile()

    const { id } = useParams();

    const [testData, refetch, loading] = useTest(id);
    pageTitle(`${testData?.testName || ''}`)

    const openModal = () => {
        document.getElementById('my_modal_1').showModal();
    };

    return (
        <>
            {loading ? (
                <Loader></Loader>
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
                                    <>
                                        <button className="font-bold uppercase bg-green-500 btn hover:bg-green-700" onClick={openModal} disabled={userData.status == 'blocked'}>Book Now</button>
                                        {userData.status == 'blocked' && <div className='p-0 m-0 text-error'>You are Blocked and cannot book a test</div>}
                                    </>
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
