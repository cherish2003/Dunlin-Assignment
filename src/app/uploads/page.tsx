"use client";
import Sidebar from "@/components/global/Sidebar";
import Navbar from "@/components/Home/navbar";
import UploadCom from "@/components/Uploads/UploadCom";
import React, { useState } from "react";

const Uploads = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full text-black flex   dark:bg-neutral-900">
        <Sidebar />
        <UploadCom />
      </div>
    </>
  );
};
export default Uploads;
