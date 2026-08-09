import React from "react";
import { motion, useReducedMotion } from "motion/react";

const bars = ["w-1/3", "w-full", "w-5/6", "w-2/3"];

export const RouteSkeleton = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className="mx-auto min-h-[55vh] w-full max-w-6xl px-6 py-16"
      data-testid="route-loading-skeleton"
      role="status"
      aria-label="Carregando conteúdo"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          {bars.map((width, index) => (
            <motion.div
              key={width}
              className={`h-4 ${width} bg-[#171020]`}
              initial={reduceMotion ? false : { opacity: 0.35 }}
              animate={reduceMotion ? undefined : { opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 0.3, repeat: Infinity, delay: index * 0.05 }}
            />
          ))}
        </div>
        <div className="aspect-[4/3] bg-[#110b19]" />
      </div>
      <span className="sr-only">Carregando</span>
    </div>
  );
};