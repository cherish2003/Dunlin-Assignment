"use client";
import { useContext, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import { JSX, SVGProps } from "react";
import { AnalysisContext } from "@/Providers/analystics-provider";

export default function UploadFile({
  setFile,
  file,
  handleUploadClick,
  isUploading,
}: any) {
  const { setAnalysisData }: any = useContext(AnalysisContext);
  const { getToken } = useAuth();

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = async () => {
    const token = await getToken();
    handleUploadClick();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:3001/api/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);

        if (response.status === 200) {
          const result = response.data;
          setAnalysisData(result);
          console.log("Analysis Result:", result);
        } else {
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {!isUploading && (
          <div
            className={`border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center ${
              dragging ? "border-gray-700 bg-gray-50" : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <FileIcon className="w-12 h-12" />
            <span className="text-sm font-medium text-gray-500">
              Drag and drop a file or click to browse
            </span>
            <span className="text-xs text-gray-500">
              Text, pdf, doc, or html
            </span>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.txt,.doc,.docx,.html"
            />
          </div>
        )}
        {file && (
          <div className="text-sm text-gray-700 mt-2">
            Selected file: {file.name}
          </div>
        )}
      </CardContent>
      {file && (
        <CardFooter className="flex justify-center items-center">
          <Button size="lg" variant="outline" onClick={handleUpload}>
            Upload
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
