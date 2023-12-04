import { faHeart, faLeaf, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, EffectCards, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Recommendations = () => {
    const axiosPublic = useAxiosPublic();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
        axiosPublic.get('/reccommendations')
            .then((response) => setRecommendations(response.data))
            .catch((error) => console.error('Error fetching recommendations:', error));
    }, [axiosPublic]);

    return (
        <div className='my-12'>
            <h1 className='mb-8 text-5xl font-bold text-center'>Recommendations</h1>
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
                {recommendations.map((recommendation) => (
                    <SwiperSlide key={recommendation._id}>
                        <div className={`flex flex-col items-center justify-center h-80 p-4 mx-4 shadow-xl my-8 rounded-3xl  
                            ${recommendation.type === 'Health Tip' && 'bg-green-50 text-green-600'}
                            ${recommendation.type === 'Preventive Measure' && 'bg-blue-50 text-blue-600'}
                            ${recommendation.type === 'Upcoming Test' && 'bg-purple-50 text-purple-600'}
                            `}>
                            <div className="mt-4">
                                {recommendation.type === 'Health Tip' && <FontAwesomeIcon icon={faLeaf} className="mb-2 text-5xl text-green-500" />}
                                {recommendation.type === 'Preventive Measure' && <FontAwesomeIcon icon={faHeart} className="mb-2 text-5xl text-red-500" />}
                                {recommendation.type === 'Upcoming Test' && <FontAwesomeIcon icon={faMicroscope} className="mb-2 text-5xl text-purple-500" />}
                            </div>
                            <div className="mb-4 text-2xl font-bold">{recommendation.type}</div>
                            <p className="w-full my-2 text-lg font-semibold text-center">{recommendation.text}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Recommendations;
