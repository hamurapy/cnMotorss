import React, { FC, PropsWithChildren } from "react";
import { IMeta } from "./meta.interface";
import Head from "next/head";
import { useRouter } from "next/router";

function getTitle(title: string) {
  return `${title} | CN MOTORS`;
}

// export async function getStaticProps() {
//   const res = await fetch(`http://localhost:4000/api/phone/`);

//   const data = await res.json();
//   const yandex = data[0].yandex;
//   const google = data[0].google;

//   return {
//     props: {
//       yandex,
//       google,
//     },
//   };
// }

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:4000/api/phone/`);
//   const data = await res.json();
//   const yandex = data[0].yandex;
//   const google = data[0].google;
//   // Pass data to the page via props
//   return {
//     props: {
//       yandex,
//       google,
//     },
//   };
// }

const Meta: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  keywords,
}) => {
  const router = useRouter();
  const url = router.asPath;

  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        {description ? (
          <>
            <link rel="canonical" href={`http://localhost:3000/${url}`} />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta name="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta name="og:description" content={description} />
            <meta name="robots" content="all" />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <link rel="icon" href="/favicon.png" />
        <meta http-equiv="cache-control" content="public" />
        <base href="http://localhost:3000/" />
        <meta name="yandex-verification" content="" />
        <meta name="google-site-verification" content="" />
      </Head>
    </>
  );
};

export default Meta;
