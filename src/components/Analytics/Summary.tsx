import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { CardContent } from "../Card";
import { TemperatureSelector } from "../ui/TemparatureSelector";
import { MaxLengthSelector } from "../ui/maxlength-selector";
import { Button } from "../ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import AnimText from "../global/AnimText";

const Summary = ({ text }: any) => {
  const { getToken } = useAuth();
  const [reverse, setReverse] = useState(false);
  const [loading, setLoading] = useState(false);

  const [temperature, setTemperature] = useState(0.7);
  const [maxLength, setMaxLength] = useState(120);
  const [summaryText, setSummaryText] = useState(text);
  const [key, setKey] = useState(0);

  const handleSummarizeAgain = async () => {
    setReverse((prev) => !prev);
    setLoading(true);
    const token = await getToken();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/getsummary",
        {
          text: summaryText,
          temperature,
          length: maxLength,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        setReverse((prev) => !prev);
        setSummaryText(response.data.summary);
        setKey((prevKey) => prevKey + 1);
      } else {
        console.error("Error generating summary:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid w-full grid-cols-1 gap-4 transition-all sm:grid-cols-2 lg:grid-cols-3">
      <div className="relative flex h-[60vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-hidden">
        <Badge variant="outline" className="absolute right-3 top-3">
          Summarization
        </Badge>
        <div className="mt-5 h-full overflow-scroll no-scrollbar">
          <AnimText text={summaryText} delay={2} reverse={reverse} key={key} />
        </div>
      
      </div>

      <CardContent>
        <div className="font-medium">Summary</div>
        <TemperatureSelector
          defaultValue={[temperature]}
          setTemperature={setTemperature}
        />
        <MaxLengthSelector
          defaultValue={[maxLength]}
          setMaxLength={setMaxLength}
        />
        <Button
          className="mt-2"
          onClick={handleSummarizeAgain}
          disabled={loading}
        >
          {loading ? "Loading..." : "Summarize again"}
        </Button>
      </CardContent>
    </section>
  );
};

export default Summary;
