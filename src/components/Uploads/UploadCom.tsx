"use client";
import React, { useState, useEffect, useRef } from "react";
import UploadFile from "./upload";
import { useAuth } from "@clerk/nextjs";
import lottie from "lottie-web";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import AnimatedTextCharacter from "../global/animatedtextchar";
import { FlipWords } from "../ui/filp-words";

const UploadCom = () => {
  const anicontainer1 = useRef<HTMLDivElement>(null);
  const anicontainer2 = useRef<HTMLDivElement>(null);
  const anicontainer3 = useRef<HTMLDivElement>(null);
  const anicontainer4 = useRef<HTMLDivElement>(null);
  const anicontainer5 = useRef<HTMLDivElement>(null);

  const words = ["PDF", "Text", "Docs ", "HTML"];

  const [mode, setmode] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [animationStep, setAnimationStep] = useState(-1);

  useEffect(() => {
    let animationInstance1: any;
    let animationInstance2: any;
    let animationInstance3: any;
    let animationInstance4: any;
    let animationInstance5: any;

    if (anicontainer1.current && animationStep === 0) {
      animationInstance1 = lottie.loadAnimation({
        container: anicontainer1.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/uploadDoc.json",
      });

      setTimeout(() => {
        setAnimationStep(1);
      }, 6000);
    }

    if (anicontainer2.current && animationStep === 1) {
      animationInstance2 = lottie.loadAnimation({
        container: anicontainer2.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/filter.json",
      });
      setTimeout(() => {
        setAnimationStep(2);
      }, 6000);
    }
    if (anicontainer3.current && animationStep === 2) {
      animationInstance3 = lottie.loadAnimation({
        container: anicontainer3.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/Analyse.json",
      });
      setTimeout(() => {
        setAnimationStep(3);
      }, 6000);
    }
    if (anicontainer4.current && animationStep === 3) {
      animationInstance4 = lottie.loadAnimation({
        container: anicontainer4.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/insights.json",
      });
      setTimeout(() => {
        setAnimationStep(4);
      }, 6000);
    }
    if (anicontainer5.current && animationStep === 4) {
      animationInstance5 = lottie.loadAnimation({
        container: anicontainer5.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/Done.json",
      });
    }

    return () => {
      if (animationInstance1) animationInstance1.destroy();
      if (animationInstance2) animationInstance2.destroy();
      if (animationInstance3) animationInstance3.destroy();
      if (animationInstance4) animationInstance4.destroy();
      if (animationInstance5) animationInstance5.destroy();
    };
  }, [animationStep]);
  const handleUploadClick = () => {
    setIsUploading(true);
    setAnimationStep(0);
  };

  return (
    <>
      <div className="min-h-screen w-full  bg-neutral-300 dark:bg-neutral-800 text-black flex flex-col justify-center items-center">
        {!isUploading && (
          <>
            <div className="text-3xl font-bold text-center mb-10">
              Upload your
              <FlipWords words={words} /> <br />
              We got you covered 🤫
            </div>
            <UploadFile
              setFile={setFile}
              file={file}
              handleUploadClick={handleUploadClick}
              isUploading={isUploading}
            />
          </>
        )}

        {animationStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-100, 0, 0, 100],
            }}
            transition={{
              ease: "easeInOut",
              duration: 6,
              times: [0, 0.25, 0.75, 1],
            }}
            className="flex flex-col justify-center items-center"
          >
            <motion.div
              className="h-60 w-60"
              ref={anicontainer1}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            />
            <AnimatedTextCharacter
              text="Uploading document.."
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {animationStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-100, 0, 0, 100],
            }}
            transition={{
              ease: "easeInOut",
              duration: 6,
              times: [0, 0.25, 0.75, 1],
            }}
            className="flex flex-col justify-center items-center"
          >
            <motion.div
              className="h-60 w-60"
              ref={anicontainer2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
            <AnimatedTextCharacter
              text="Extracting the text.."
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
        {animationStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-100, 0, 0, 100],
            }}
            transition={{
              ease: "easeInOut",
              duration: 6,
              times: [0, 0.25, 0.75, 1],
            }}
            className="flex flex-col justify-center items-center"
          >
            <motion.div
              className="h-60 w-60"
              ref={anicontainer3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
            <AnimatedTextCharacter
              text="Analysing..."
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
        {animationStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-100, 0, 0, 100],
            }}
            transition={{
              ease: "easeInOut",
              duration: 6,
              times: [0, 0.25, 0.75, 1],
            }}
            className="flex flex-col justify-center items-center"
          >
            <motion.div
              className="h-60 w-60"
              ref={anicontainer4}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
            <AnimatedTextCharacter
              text="Summaring and gathering insights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
        {animationStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-100, 0, 0, 100],
            }}
            transition={{
              ease: "easeInOut",
              duration: 6,
              times: [0, 0.25, 0.75, 1],
            }}
            className="flex flex-col justify-center items-center"
          >
            <motion.div
              className="h-60 w-60"
              ref={anicontainer5}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
            <AnimatedTextCharacter
              text="Done !! you will redirected to analytics page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default UploadCom;
