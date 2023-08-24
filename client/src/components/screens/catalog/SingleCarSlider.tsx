import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import { CarPhotos } from './catalog.types';

function SingleCarSlider({ photos }: { photos: CarPhotos }):JSX.Element {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={true}
      navigation={true}
      modules={[Mousewheel, Navigation]}
      className="singleCarSwiper">
      {photos.map((photo, index) => (
          <SwiperSlide key={index}>
              <Image
                src={`http://localhost:4000${photo.img}`}
                alt=""
                priority={true}
                width={200}
                height={200}
                // layout="fill"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
          </SwiperSlide>
        ))}  
    </Swiper>
  )
}

export default SingleCarSlider