"use client";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Upload,
  CornerDownLeft,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AnalysisContext } from "@/Providers/analystics-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Summary from "./Summary";
import NERandPOS from "./NERandPOS";
import { CategoriesBarGraph } from "./CategoriesBarGraph";
import { OverallSentiment } from "./OverallSentiment";
import { SentimentChart } from "./SentimentlineChart";
import { EntityTable } from "./entitytable";
import { CardContent } from "../ui/card";
import Card from "../Card";

export default function AnalyticsMain() {
  const { analysisData, selectedFile, setSelectedFile }: any =
    useContext(AnalysisContext);

  // const [fileChanged, setFileChanged] = useState(false);

  const handleFileChange = (value: string) => {
    setSelectedFile(value);
  };

  useEffect(() => {
    if (!selectedFile && Object.keys(analysisData).length > 0) {
      setSelectedFile(Object.keys(analysisData)[0]);
    }
  }, [analysisData, selectedFile, setSelectedFile]);

  const currentData = selectedFile ? analysisData[selectedFile] : null;

  return (
    <>
      <div className="flex flex-col gap-5 w-full dark:bg-neutral-900 dark:text-white">
        <Select value={selectedFile || ""} onValueChange={handleFileChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder="Select File"
            />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(analysisData).map((fileName) => (
              <SelectItem
                key={fileName}
                value={fileName}
                className="dark:text-white"
              >
                {fileName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {currentData && (
          <>
            <Summary text={currentData.summary} />
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Named Entity Recognition & Part-of-Speech Tagging
              </h3>
              <NERandPOS
                nerEntities={currentData.entities.entities}
                posTokens={currentData.syntax.tokens}
              />
            </div>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
              <CategoriesBarGraph
                categories={currentData.classification.categories}
              />
              <CardContent className="flex flex-col justify-center gap-2">
                <OverallSentiment
                  documentSentiment={currentData.sentiment.documentSentiment}
                />
              </CardContent>
            </section>
            <SentimentChart sentences={currentData.sentiment.sentences} />
            <EntityTable entities={currentData.entities.entities} />
          </>
        )}
      </div>
      {!currentData && (
        <div className="h-full flex justify-center items-center">
          <CardContent className="flex-col justify-center font-semibold text-center text-xl dark:text-white">
            No files found 🥲
            <div className="">go to upload section and upload a file </div>
          </CardContent>
        </div>
      )}
    </>
  );
}
