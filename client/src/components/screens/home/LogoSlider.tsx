"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image'
import 'swiper/css';
import styles from './home.module.css'

export default function logoSlider() {
  return (
    <>
    <section className={styles.grey}>
      <Swiper
        slidesPerView={6}
        spaceBetween={40}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
        }}
        modules={[Autoplay]}
        className="logoSwiper"
      >
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo1.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo2.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo3.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo4.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo5.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo6.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo7.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imgBlock}>
            <Image
					    src="/logo/carlogo8.png"
              alt="logo"
              width={100}
              height={100}
				    />
          </div>
        </SwiperSlide>
      </Swiper>
      </section>
    </>
  );
}