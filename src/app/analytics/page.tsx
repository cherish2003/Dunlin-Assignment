"use client";

import AnalyticsMain from "@/components/Analytics/main";
import Sidebar from "@/components/global/Sidebar";
import Navbar from "@/components/Home/navbar";
import React, { useContext } from "react";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { AnalysisContext } from "@/Providers/analystics-provider";

const Analytics = () => {
  const { analysisData }: any = useContext(AnalysisContext);
  console.log(analysisData);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full dark:bg-neutral-900 text-black flex">
        <Sidebar />
        <div className="p-5 w-full mt-20 h-[calc(100vh-80px)] overflow-hidden ">
          <div className="h-full w-full overflow-y-auto no-scrollbar">
            <AnalyticsMain />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
