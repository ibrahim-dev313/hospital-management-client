/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../../Components/Loader';
import useAllBanners from '../../hooks/useAllBanners';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const BookModal = ({ testData }) => {
    const [allBanners] = useAllBanners()
    // console.log(allBanners);
    const filtered = allBanners.find(banner => banner.isActive == true)
    const { couponCode, couponRate } = filtered;
    // console.log(filtered);

    const { setValue } = useForm();

    const [netPrice, setNetPrice] = useState(testData?.testFee);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    // useEffect(() => {
    //     axiosSecure.post('/create-payment-intent')
    // }, [])
    const handlePromoCodeChange = async (e) => {
        const promoCode = e.target.value;
        console.log(promoCode);
        if (promoCode != couponCode) {
            setNetPrice(testData?.testFee)
            console.log(netPrice);


        } else if (promoCode == couponCode) {
            const updatedNetPrice = calculateNetPrice(parseInt(testData?.testFee), couponRate);
            setNetPrice(parseInt(updatedNetPrice));
            setValue('netPrice', parseInt(updatedNetPrice));
        }

    };


    const calculateNetPrice = (basePrice) => {

        const discountPercentage = couponRate;
        const discount = (basePrice * discountPercentage) / 100;
        return basePrice - discount;
    };

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };
    return (
        <>
            {
                !netPrice ? <Loader></Loader> :
                    <div>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">Book Now</h3>
                                <form >
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
                                    <div className="py-4">
                                        <label htmlFor="promoCode">Promo Code:</label>
                                        <input
                                            type="text"
                                            id="promoCode"
                                            name="promoCode"
                                            onChange={handlePromoCodeChange}
                                            className="w-full p-2 border rounded-md"
                                        // ref={register}
                                        />
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
                                        // ref={register}
                                        />
                                    </div>
                                </form>
                                <form onSubmit={handleSubmit}>

                                    <div className="py-4">
                                        <label htmlFor="card">Card Details:</label>
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
                                    <button type="submit" className="btn-wide btn btn-success" disabled={!stripe}>
                                        Pay
                                    </button>
                                </form>
                            </div>
                        </dialog>
                    </div>
            }
        </>

    );
};

export default BookModal;