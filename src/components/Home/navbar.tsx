"use client";
import lottie from "lottie-web";
import Link from "next/link";
import { ModeToggle } from "../ui/ModeToggle";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const anicontainer = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useUser();

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

      <aside className="flex items-center gap-5">
        <UserButton />
        {!isSignedIn && (
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            {"Login"}
          </Link>
        )}
        {isSignedIn && (
          <Link
            href="/uploads"
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            {"Get started"}
          </Link>
        )}
        <ModeToggle setMode={setMode} />
      </aside>
    </header>
  );
};
export default Navbar;
