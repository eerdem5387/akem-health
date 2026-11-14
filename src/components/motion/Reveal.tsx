"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </Component>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerGroup({ children, className, staggerDelay = 0.08 }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}
