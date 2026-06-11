"use client";

import React from "react";

interface WordCounterProps {
  text: string;
  maxWords: number;
}

export default function WordCounter({ text, maxWords }: WordCounterProps) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const percentage = (words / maxWords) * 100;

  let color = "text-gray-500";
  if (percentage > 90) color = "text-red-400";
  else if (percentage > 70) color = "text-amber-400";
  else if (words > 0) color = "text-green-400";

  return (
    <span className={`text-xs font-medium transition-colors ${color}`}>
      {words} / {maxWords} words
    </span>
  );
}
