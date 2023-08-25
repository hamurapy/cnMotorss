import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CarPhotos } from "./catalog.types";
import FsLightbox from "fslightbox-react";

function SingleCarSlider({ photos }: { photos: CarPhotos }): JSX.Element {
  const [toggler, setToggler] = useState(false);

  const carsArray = photos.map((photo, index) => (
    <Image
      key={index}
      src={`http://localhost:4000${photo.img}`}
      alt=""
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      priority={true}
    />
  ));
  console.log(carsArray);
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
            <Image
              onClick={() => setToggler(!toggler)}
              src={`http://localhost:4000${photo.img}`}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <FsLightbox toggler={toggler} sources={carsArray} />
    </>
  );
}

export default SingleCarSlider;
