"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
import styled from "styled-components";

const Div = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

`
export function CardStackDemo() {
  return (
    <Div >
      <CardStack items={CARDS} />
    </Div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({ children, className }) => {
  return (
    <span
      className={cn(
        "font-bold  text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    img: "/emoji1.webp",
    content: (
      <p>
        Oops, <Highlight>This page is still under construction</Highlight>🙏
      </p>
    ),
  },

  {
    id: 2,
    img: "/emoji2.webp",
    content: (
      <p>
        Let’s turn this canvas into a{" "}
        <Highlight>work of art together. 🎨</Highlight>
      </p>
    ),
  },

  {
    id: 1,
    img: "/emoji3.webp",
    content: (
      <p>
        But hey, if you like what you see, why not
        <Highlight>fund the masterpiece! 💰</Highlight>
      </p>
    ),
  },
];
