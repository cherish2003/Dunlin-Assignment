"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AnalysisContextType {
  analysisData: any | null;
  setAnalysisData: React.Dispatch<React.SetStateAction<any | null>>;
  clearAnalysisData: () => void;
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
  const [analysisData, setAnalysisData] = useState<any | null>(() => {
    const storedData = localStorage.getItem("analysisData");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (analysisData) {
      localStorage.setItem("analysisData", JSON.stringify(analysisData));
    } else {
      localStorage.removeItem("analysisData");
    }
  }, [analysisData]);

  const clearAnalysisData = () => {
    setAnalysisData(null);
    localStorage.removeItem("analysisData");
  };

  return (
    <AnalysisContext.Provider
      value={{ analysisData, setAnalysisData, clearAnalysisData }}
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
