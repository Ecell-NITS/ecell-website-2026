"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  labels = ["Personal Details", "Task Details"],
}: StepIndicatorProps) {
  return (
    <div className="mb-8 w-full">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-sm font-medium text-white">
          {labels[currentStep - 1]}
        </span>
        <span className="text-xs font-light text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="flex h-1.5 w-full gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isActiveOrCompleted = i < currentStep;
          return (
            <div
              key={i}
              className={`relative flex-1 overflow-hidden rounded-full ${
                isActiveOrCompleted ? "bg-white/20" : "bg-white/5"
              }`}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: isActiveOrCompleted ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Smooth spring-like easeOut
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
