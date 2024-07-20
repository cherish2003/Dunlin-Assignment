"use client";
import Image from "next/image";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Upload,
  CornerDownLeft,
} from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import UploadFile from "../Uploads/upload";
import SalesCard, { SalesProps } from "./SalesCard";
import { SentimentChart } from "./SentimentlineChart";
import { useContext } from "react";
import { AnalysisContext } from "@/Providers/analystics-provider";
import { OverallSentiment } from "./OverallSentiment";
import { CategoriesBarGraph } from "./CategoriesBarGraph";
import { EntityTable } from "./entitytable";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { TemperatureSelector } from "../ui/TemparatureSelector";
import { MaxLengthSelector } from "../ui/maxlength-selector";
import Summary from "./Summary";
import NERandPOS from "./NERandPOS";
import { ComboboxDemo } from "./Combobox";

export default function AnalyticsMain() {
  const { analysisData }: any = useContext(AnalysisContext);

  return (
    <div className="flex flex-col gap-5 w-full  dark: dark:bg-neutral-900">
      <ComboboxDemo />
      <Summary text={analysisData?.summary} />

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">
          {" "}
          Named Entity Recognition & Part-of-Speech Tagging
        </h3>
        <NERandPOS
          nerEntities={analysisData?.entities?.entities}
          posTokens={analysisData?.syntax?.tokens}
        />
      </div>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CategoriesBarGraph
          categories={analysisData.classification.categories}
        />
        <CardContent className="flex-col justify-center gap-4">
          <OverallSentiment
            documentSentiment={analysisData?.sentiment?.documentSentiment}
          />
        </CardContent>
      </section>

      <SentimentChart sentences={analysisData?.sentiment?.sentences} />

      <EntityTable entities={analysisData?.entities?.entities} />
    </div>
  );
}
