"use client";
import React from "react";
import Image from "next/image";
import styles from "./home.module.css";

const carslogos = [
  {
    id: 1,
    logo: "/logo/carlogo1.png",
  },
  {
    id: 2,
    logo: "/logo/carlogo2.png",
  },
  {
    id: 3,
    logo: "/logo/carlogo3.png",
  },
  {
    id: 4,
    logo: "/logo/carlogo4.png",
  },
  {
    id: 5,
    logo: "/logo/carlogo5.png",
  },
  {
    id: 6,
    logo: "/logo/carlogo6.png",
  },
  {
    id: 7,
    logo: "/logo/carlogo7.png",
  },
  {
    id: 9,
    logo: "/logo/carlogo8.png",
  },
  {
    id: 10,
    logo: "/logo/carlogo9.png",
  },
  {
    id: 11,
    logo: "/logo/carlogo10.png",
  },
  {
    id: 12,
    logo: "/logo/carlogo11.png",
  },
  {
    id: 13,
    logo: "/logo/carlogo12.png",
  },
  {
    id: 14,
    logo: "/logo/carlogo13.png",
  },
];
export default function logoSlider() {
  return (
    <section className={styles.grey}>
      <div className={styles.logoSlider}>
        <div className={styles.logoTrack}>
          {carslogos.map((carlogo) => {
            return (
              <div key={carlogo.id} className={styles.logoItem}>
                <Image src={carlogo.logo} alt="logo" width={150} height={150} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
