"use client";

import { useEffect, useState } from "react";
import { Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/global/PageTitle";
import { DataTable } from "@/components/global/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Navbar from "@/components/Home/navbar";
import Sidebar from "@/components/global/Sidebar";
import { Button } from "@/components/ui/button";

type Classification = {
  name: string;
  confidence: number;
};

type Entity = {
  mentions: Array<{
    text: { content: string; beginOffset: number };
    type: string;
    sentiment: any;
  }>;
  name: string;
  type: string;
  salience: number;
  sentiment: any;
};

type Sentiment = {
  magnitude: number;
  score: number;
};

type Sentence = {
  text: { content: string; beginOffset: number };
  sentiment: { magnitude: number; score: number };
};

type Token = {
  text: { content: string; beginOffset: number };
  partOfSpeech: { tag: string; [key: string]: any };
  dependencyEdge: { headTokenIndex: number; label: string };
  lemma: string;
};

type AnalysisData = {
  filename: string;
  classification: Classification[];
  entities: Entity[];
  documentSentiment: Sentiment;
  sentences: Sentence[];
  summary: string;
  syntax: { sentences: Sentence[]; tokens: Token[] };
};

const fetchFilesFromLocalStorage = (): AnalysisData[] => {
  const filesData = JSON.parse(localStorage.getItem("analysisData")) || {};
  return Object.keys(filesData).map((key) => ({
    filename: key,
    classification: Array.isArray(filesData[key]?.classification?.categories)
      ? filesData[key].classification.categories
      : [],
    entities: Array.isArray(filesData[key]?.entities?.entities)
      ? filesData[key].entities.entities
      : [],
    documentSentiment: filesData[key]?.sentiment?.documentSentiment || {
      magnitude: 0,
      score: 0,
    },
    sentences: Array.isArray(filesData[key]?.sentiment?.sentences)
      ? filesData[key].sentiment.sentences
      : [],
    summary: filesData[key]?.summary || "",
    syntax: filesData[key]?.syntax || { sentences: [], tokens: [] },
  }));
};

export default function OrdersPage() {
  const [data, setData] = useState<AnalysisData[]>([]);

  useEffect(() => {
    const files = fetchFilesFromLocalStorage();
    setData(files);
  }, []);

  const handleDelete = (filename: string) => {
    const storedData = localStorage.getItem("analysisData");
    const filesData = storedData ? JSON.parse(storedData) : {};

    delete filesData[filename];

    localStorage.setItem("analysisData", JSON.stringify(filesData));

    setData(fetchFilesFromLocalStorage());
  };

  const handleDownloadReport = (fileData: AnalysisData) => {
    const csvData = generateCSV([fileData]);
    downloadCSV(csvData, fileData.filename);
  };

  const generateCSV = (data: AnalysisData[]) => {
    const header = [
      "Filename",
      "Classification Name",
      "Classification Confidence",
      "Entities",
      "Document Sentiment Magnitude",
      "Document Sentiment Score",
      "Summary",
      "Syntax Sentences",
      "Syntax Tokens",
    ];

    const rows = data.map((item) => [
      item.filename,
      item.classification.map((c) => c.name).join(", "),
      item.classification
        .map((c) =>
          typeof c.confidence === "number" ? c.confidence.toFixed(2) : ""
        )
        .join(", "),
      Array.isArray(item.entities)
        ? item.entities.map((e) => e.name).join("; ")
        : "",
      typeof item.documentSentiment.magnitude === "number"
        ? item.documentSentiment.magnitude.toFixed(2)
        : "",
      typeof item.documentSentiment.score === "number"
        ? item.documentSentiment.score.toFixed(2)
        : "",
      item.summary,
      item.syntax.sentences.map((s) => s.text.content).join("; "),
      item.syntax.tokens.map((t) => t.text.content).join("; "),
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      header.join(",") +
      "\n" +
      rows.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");

    return encodeURI(csvContent);
  };

  const downloadCSV = (csvData: string, filename: string) => {
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", `${filename}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: ColumnDef<AnalysisData>[] = [
    {
      accessorKey: "filename",
      header: "File Name",
    },
    {
      id: "actions",
      header: "Report",
      cell: ({ row }) => {
        const fileData = row.original;
        return (
          <Button
            onClick={() => handleDownloadReport(fileData)}
            variant={"outline"}
          >
            <Download />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Delete File",
      cell: ({ row }) => {
        const filename = row.getValue("filename");
        return (
          <>
            <Button
              onClick={() => handleDelete(filename)}
              variant={"destructive"}
            >
              <Trash2 />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full dark:bg-neutral-900 flex">
        <Sidebar />
        <div className="mx-5 flex flex-col gap-5 w-full dark:text-white dark:bg-neutral-900 mt-20">
          <PageTitle title="Files" />
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
