"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-space-sm">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <button
              className="flex w-full items-center justify-between text-left text-headline-sm font-semibold text-primary"
              onClick={() => setOpenIndex(open ? null : index)}
              type="button"
            >
              <span>{item.question}</span>
              <Icon
                name="expand_more"
                className={`text-secondary transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <p className="mt-3 leading-relaxed text-body-sm text-on-surface-variant">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
