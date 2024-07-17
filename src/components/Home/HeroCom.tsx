"use client";
import { motion, useAnimation } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { useEffect, useRef } from "react";

export function HeroCom() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: [20, -5, 0],
            transition: {
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            },
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={controls}
        ref={ref}
        className="text-2xl px-4 md:text-4xl lg:text-6xl font-bold  dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        With Insightify,
        <Highlight className="text-white dark:text-black text-wrap inline text-center">
          every detail is analyzed, providing comprehensive summaries and
          valuable insights.
          {/* <span className="inline-block align-middle text-center text-white">
            <img
              src="/eyewhite.svg"
              alt="eye"
              className="inline-block w-12 h-12 align-middle"
            />
          </span> */}
        </Highlight>{" "}
        to keep you informed and ahead 
      </motion.h1>
    </HeroHighlight>
  );
}
