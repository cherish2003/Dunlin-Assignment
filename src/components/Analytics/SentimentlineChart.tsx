"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  sentimentScore: {
    label: "Sentiment Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const SentimentChart = ({ sentences }: any) => {
  const chartData = React.useMemo(() => {
    if (sentences) {
      return sentences.map((sentence: any, index: number) => ({
        sentenceIndex: index + 1,
        sentimentScore: sentence.sentiment.score,
      }));
    }
  }, []);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("sentimentScore");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Sentiment Analysis</CardTitle>
          <CardDescription>
            Showing sentiment scores over the sentences from the uploaded
            document
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sentenceIndex"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => `Sentence ${value}`}
            />
            <YAxis
              dataKey="sentimentScore"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => `Sentence ${value}`}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { SentimentChart };
