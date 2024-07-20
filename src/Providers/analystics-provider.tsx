"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AnalysisData {
  [filename: string]: {
    syntax: any;
    sentiment: any;
    entities: any;
    classification: any;
    summary: any;
  };
}

interface AnalysisContextType {
  analysisData: AnalysisData;
  selectedFile: string | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | null>>;
  setAnalysisData: React.Dispatch<React.SetStateAction<AnalysisData>>;
  clearAnalysisData: () => void;
  uploadAnalysisData: (
    filename: string,
    data: AnalysisData[keyof AnalysisData]
  ) => void;
}

export const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({
  children,
}) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData>(() => {
    const storedData = localStorage.getItem("analysisData");
    return storedData ? JSON.parse(storedData) : {};
  });

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("analysisData", JSON.stringify(analysisData));
  }, [analysisData]);

  const clearAnalysisData = () => {
    setAnalysisData({});
    localStorage.removeItem("analysisData");
  };

  const uploadAnalysisData = (
    filename: string,
    data: AnalysisData[keyof AnalysisData]
  ) => {
    setAnalysisData((prevData) => ({
      ...prevData,
      [filename]: data,
    }));
    setSelectedFile(filename);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        selectedFile,
        setSelectedFile,
        setAnalysisData,
        clearAnalysisData,
        uploadAnalysisData,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
