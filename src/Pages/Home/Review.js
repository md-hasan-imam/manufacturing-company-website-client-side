import React, { useEffect, useState } from 'react';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Review = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='my-20'>
            <div className='mb-20'>
                <h2 className='text-3xl my-3 font-bold'>CUSTOMER REVIEWS</h2>
            </div>
            <div className='mx-5'>
                <Swiper
                    // install Swiper modules
                    autoplay={{
                        autoplay:true,
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {
                        reviews.map((review, index) =>
                            <div key={index} >
                                <SwiperSlide>
                                    <div className='stack'>
                                        <div className='h-56 card shadow-md bg-accent text-primary-content py-3'>
                                            <div className='card-body '>
                                                <h3 ><span className='text-2xl text-secondary font-bold '>{review.name}</span> </h3>
                                                <p className='text-sm my-1'>{review.description}</p>
                                                <p className='font-bold'>Ratings: <span className='text-lg font-bold text-yellow-500'>{review.ratings}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </div>)
                    }
                </Swiper>
            </div >
        </div >
    );
};

export default Review;