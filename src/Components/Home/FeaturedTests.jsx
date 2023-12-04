import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, EffectCards, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAllTests from '../../hooks/useAllTests';

const FeaturedTestCard = () => {
    const [mostBookedTests, setMostBookedTests] = useState([]);
    const [allTests] = useAllTests();

    useEffect(() => {
        if (allTests.length) {
            const sortedTests = allTests.slice().sort((a, b) => b.totalBooking - a.totalBooking);
            console.log(sortedTests);
            setMostBookedTests(sortedTests.slice(0, 5));
        }
    }, [allTests]);

    return (
        <div className='my-12'>
            <h1 className='mb-8 text-5xl font-bold text-center'>Featured Test</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay, EffectCards]}
                className="mySwiper"
            >
                {mostBookedTests.map((test) => (
                    <SwiperSlide key={test._id}>
                        <div className={`flex flex-col items-center justify-center  p-4 mx-4 shadow-xl my-8 rounded-3xl`}>
                            <div>
                                <figure className='relative w-full'>
                                    <img className='w-full rounded-t-lg h-80' src={test.testImage} alt="Shoes" />
                                    <p className='absolute top-0 right-0 m-3 font-extrabold uppercase btn-neutral btn btn-sm'>Slots Available {test.availableSlots}</p>
                                    <p className='absolute top-0 left-0 m-3 font-extrabold uppercase btn-accent btn btn-sm'>Total Booking {test.totalBooking}</p>
                                </figure>
                                <div className="flex items-center justify-center h-24 bg-green-100 rounded-b-xl">
                                    <h2 className="text-2xl font-bold text-center">{test.testName}</h2>
                                    <div className="justify-center mt-3 card-actions">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedTestCard;
