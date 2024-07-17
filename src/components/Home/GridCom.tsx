import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

const GridCom = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-coolgratli dark:bg-coolgratdr min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text-white">
            Insightify captures and analyzes every detail.
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-500 dark:text-neutral-300">
            It provides comprehensive summaries and key insights through a
            user-friendly interface and AI-driven text processing.
          </p>
        </div>
        <Image
          src="/img2.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-coolgratli dark:bg-coolgratdr">
        <h2 className="max-w-80  text-left text-balance text-base  md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text-white ">
          PDFs, DOCs, text files we got you covered.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6  text-neutral-500 dark:text-neutral-300">
          Upload text content in formats like plain text, HTML, or doc files,
          and receive comprehensive summaries and key insights using our
          AI-driven text processing.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-coolgratli dark:bg-coolgratdr min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]  text-black dark:text-white">
            Our dashboard presents key insights from your uploaded documents.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-500 dark:text-neutral-300">
            Easily view, analyze, and download summaries and extracted data
            points.
          </p>
        </div>
        <Image
          src="/img2.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
};

export default GridCom;
