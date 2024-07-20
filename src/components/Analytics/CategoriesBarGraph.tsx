"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";

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
  desktop: {
    label: "Confidence",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CategoriesBarGraph({ categories }: any) {
  const data = categories?.map(
    (category: { name: string; confidence: number }) => ({
      category: category.name,
      desktop: category.confidence,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Confidence</CardTitle>
        <CardDescription>
          Identified Categories and their confidence scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{ left: 12, right: 12, top: 12, bottom: 30 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 20)}
            />
            <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
        <div className=" font-medium text-muted-foreground">
          Identified categories
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm overflow-scroll no-scrollbar">
        <div className="flex gap-2 leading-none whitespace-nowrap ">
          {categories.map((category: { name: string }) => (
            <Badge key={category.name} variant={"outline"}>
              {category.name}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
