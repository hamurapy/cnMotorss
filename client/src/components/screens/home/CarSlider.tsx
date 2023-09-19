import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { CarPhotos } from "../catalog/catalog.types";
import styles from "./home.module.css";

function CarSlider({ photos }: { photos: CarPhotos }): JSX.Element {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="carSwiper"
      >
        {photos
          .map((photo, index) => (
            <SwiperSlide key={index}>
              <div className={styles.imgBlock}>
                <Image
                  src={`${process.env.PORT_BACKEND}${photo.img}`}
                  alt=""
                  priority={true}
                  width={0}
                  height={0}
                  layout="fill"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))
          .slice(0, 5)}
      </Swiper>
    </>
  );
}

export default CarSlider;
