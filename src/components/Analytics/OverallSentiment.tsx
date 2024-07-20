"use client";

import { TrendingUp } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  score: {
    label: "Visitors",
  },
  chrome: {
    label: "Magnitude",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Sentiment",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function OverallSentiment({ documentSentiment }: any) {
  const formattedMagnitude = documentSentiment?.magnitude
    ? documentSentiment?.magnitude.toFixed(1)
    : "N/A";
  const formattedSentiment = documentSentiment?.score
    ? documentSentiment?.score.toFixed(1)
    : "N/A";

  const chartData = [
    {
      browser: "chrome",
      score: formattedMagnitude,
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      score: documentSentiment?.score,
      fill: "var(--color-safari)",
    },
  ];
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Overall Sentiment & magnitude</CardTitle>
        <CardDescription>of the uploaded document</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="score" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overall sentiment : {formattedSentiment}
        </div>
        <div className="font-medium leading-none text-muted-foreground">
          {" "}
          Magnititude : {formattedMagnitude}
        </div>
      </CardFooter>
    </Card>
  );
}
