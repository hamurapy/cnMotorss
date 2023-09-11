import React, { FC, PropsWithChildren } from "react";
import { IMeta } from "./meta.interface";
import Head from "next/head";

function getTitle(title: string) {
  return `${title} | CN MOTORS`;
}

const Meta: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        {description ? (
          <>
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
      </Head>
    </>
  );
};

export default Meta;
