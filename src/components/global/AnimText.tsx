import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import CursorBlinker from "./CursorBlinker";

export interface IAnimTextProps {
  delay: number;
  text: string;
  reverse?: boolean;
}

export default function AnimText({
  delay,
  text,
  reverse = false,
}: IAnimTextProps) {
  const [done, setDone] = useState(false);
  const baseText = ` ${text} `;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
      onComplete: () => {
        setDone(true);
      },
    });

    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  useEffect(() => {
    if (reverse) {
      const reverseControls = animate(count, 0, {
        type: "tween",
        delay: delay,
        duration: 1,
        ease: "easeInOut",
        onComplete: () => {
          setDone(true);
        },
      });

      return reverseControls.stop;
    }
  }, [reverse, delay]);

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      {done && (
        <>
          <br /> <br />
        </>
      )}
      {/* <CursorBlinker /> */}
    </span>
  );
}
