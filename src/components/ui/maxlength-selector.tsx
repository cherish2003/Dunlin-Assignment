"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Label } from "./label";
import { Slider } from "./slider";
import { useEffect, useState } from "react";

export function MaxLengthSelector({ defaultValue, setMaxLength }: any) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setMaxLength(value[0]);
  }, [value]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Maximum Length</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="maxlength"
              max={1000}
              defaultValue={value}
              step={10}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Maximum Length"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The total number of words in summarized text
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
