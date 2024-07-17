"use client";
import lottie from "lottie-web";
import Link from "next/link";
import { ModeToggle } from "../ui/ModeToggle";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

export default function Component() {
  const anicontainer = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState("light");

  useEffect(() => {
    console.log(mode);
    
    if (anicontainer.current) {
      const animationInstance = lottie.loadAnimation({
        container: anicontainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: `${mode == "light" ? "/Ani3.json " : "/Ani3white.json  "}`,
      });

      return () => {
        animationInstance.destroy();
      };
    }
  }, [mode]);

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center justify-center">
        <p className="text-3xl font-bold">Insightif</p>
        <div className="h-10 w-10 text-white" ref={anicontainer}></div>
      </aside>

      <aside className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {"Get Started"}
          </span>
        </Link>
        <ModeToggle setMode={setMode} />
      </aside>
    </header>
  );
}
