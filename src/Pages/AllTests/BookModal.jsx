/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';
import useAllBanners from '../../hooks/useAllBanners';
import useAllTests from '../../hooks/useAllTests';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useProfile from '../../hooks/useProfile';

const BookModal = ({ testData }) => {
    const [allBanners] = useAllBanners();
    const [, refetch] = useAllTests();

    const { user } = useAuth();
    const [userData, , loading] = useProfile()
    const [clientSecret, setClientSecret] = useState('');


    const [netPrice, setNetPrice] = useState(testData?.testFee);
    const [promoMessage, setPromoMessage] = useState('');
    const { setValue } = useForm();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const filtered = allBanners.find((banner) => banner.isActive === true);
    const { couponCode, couponRate } = filtered;

    useEffect(() => {
        if (testData) {
            setNetPrice(testData.testFee);
        }
    }, [testData]);
    // console.log(userData);
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: netPrice })
            .then((res) => {
                // console.log(res.data);
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure, netPrice]);

    const handlePromoCodeChange = async (e) => {
        const promoCode = e.target.value;

        if (promoCode !== couponCode) {
            setNetPrice(testData?.testFee);
            setPromoMessage('');
        } else if (promoCode === couponCode) {
            const updatedNetPrice = calculateNetPrice(parseInt(testData?.testFee), couponRate);
            setNetPrice(parseInt(updatedNetPrice));
            setValue('netPrice', parseInt(updatedNetPrice));
            setPromoMessage('Promo code applied successfully!');
        } else {
            setPromoMessage('Invalid promo code. Please try again.');
        }
    };

    const calculateNetPrice = (basePrice) => {
        const discountPercentage = couponRate;
        const discount = (basePrice * discountPercentage) / 100;
        return basePrice - discount;
    };
    const reservationData = {
        testId: testData._id,
        testName: testData.testName,
        testDate: testData.testDate,
        patientEmail: userData.email,
        patientName: userData.name,
        reportStatus: 'pending'
    }
    // console.log(reservationData);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('confirm error');
        } else {
            console.log('payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                // Close the modal upon successful payment
                try {
                    const response = await axiosSecure.put('/confirm', { testId: testData._id });
                    console.log(response);
                    if (response.data) {
                        try {
                            const response = await axiosSecure.post("/reservations", reservationData, {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            console.log(response.data);
                        } catch (error) {
                            console.log(error);
                        }
                        refetch()
                    } else {
                        console.error('Failed to update available slots:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error updating available slots:', error);
                }
                document.getElementById('my_modal_1').close();
                toast.success('Payment & Booking successful!');
            }
        }
    };

    return (
        <>
            {!testData && !loading && userData.length === 0 ? (
                <Loader />
            ) : (
                <>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Book Now</h3>
                            <form>
                                <div className="py-4">
                                    <label htmlFor="testData?.testFee">Price:</label>
                                    <input
                                        type="number"
                                        id="testData?.testFee"
                                        name="testData?.testFee"
                                        value={testData?.testFee}
                                        disabled
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="promoCode">Promo Code:</label>
                                    <input
                                        type="text"
                                        id="promoCode"
                                        name="promoCode"
                                        onChange={handlePromoCodeChange}
                                        className="w-full p-2 border rounded-md"
                                    />

                                    <span className={promoMessage.includes('Invalid') ? 'text-red-500 h-4' : 'text-green-500 p-0 h-4'}>
                                        {promoMessage}
                                    </span>
                                </div>
                                <div className="py-4">
                                    <label htmlFor="netPrice">Net Price:</label>
                                    <input
                                        type="number"
                                        id="netPrice"
                                        name="netPrice"
                                        value={netPrice}
                                        disabled
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </form>
                            <form method="dialog" className="" onSubmit={handleSubmit}>
                                <div className="flex flex-col py-4">
                                    <label htmlFor="card" className="mb-4">Card Details:</label>
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#424770',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <button
                                    className={`rounded-xl btn-block btn btn-success ${userData.status === 'blocked' && 'disabled'}`}
                                    disabled={!stripe || !clientSecret}
                                >
                                    Pay
                                </button>


                            </form>
                        </div>
                    </dialog>
                </>
            )}
        </>
    );
};

export default BookModal;
