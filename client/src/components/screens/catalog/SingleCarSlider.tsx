import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CarPhotos } from "./catalog.types";
import FsLightbox from "fslightbox-react";
import styles from "@/components/screens/catalog/catalog.module.css";

function SingleCarSlider({ photos }: { photos: CarPhotos }): JSX.Element {
  const [toggler, setToggler] = useState(false);

  const carsArray = photos.map((photo, index) => (
    <Image
      key={index}
      src={`${process.env.PORT_BACKEND}${photo.img}`}
      alt="Car"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      priority={true}
    />
  ));

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="singleCarSwiper"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imgBlock}>
              <Image
                onClick={() => setToggler(!toggler)}
                src={`${process.env.PORT_BACKEND}${photo.img}`}
                alt="Car"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "60vh" }}
                priority={true}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <FsLightbox toggler={toggler} sources={carsArray} />
    </>
  );
}

export default SingleCarSlider;
