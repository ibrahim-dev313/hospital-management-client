/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';
import useAllBanners from '../../hooks/useAllBanners';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookModal = ({ testData, openModal }) => {
    const [allBanners] = useAllBanners();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: netPrice })
            .then((res) => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure, netPrice]);

    const handlePromoCodeChange = async (e) => {
        const promoCode = e.target.value;

        if (promoCode !== couponCode) {
            setNetPrice(testData?.testFee);
            setPromoMessage(''); // Reset promo message
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
                document.getElementById('my_modal_1').close();

                // Notify the user of successful payment
                toast.success('Payment Successful');
            }
        }
    };

    return (
        <>
            {!testData ? (
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
                                <button className="rounded-xl btn-block btn btn-success" disabled={!stripe || !clientSecret}>
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
