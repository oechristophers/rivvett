"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  height: 100%;
  margin-top: 60px;
`
const CardDiv = styled(motion.div)`
  width: 500px;
  height: 300px;
  @media (max-width: 600px) {
     width: 70vw;
  }
`

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <MainDiv className="relative ">
      {cards.map((card, index) => {
        return (
          <CardDiv
            key={card.id}
            className="absolute dark:bg-[black] bg-black rounded-3xl p-4 shadow-xl border border-zinc-200 border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between dark:border-zinc-800"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="flex justify-center">
              <div className="h-32 w-32 ">
                <img
                  src={card.img}
                  alt={card.img}
                  className="object-cover w-full h-full rounded-3xl"
                />
              </div>
            </div>
            <div className="font-normal text-2xl text-white dark:text-neutral-200"
            style={{fontFamily:'Futura Std Heavy', letterSpacing:'1px'  }}
            >
              {card.content}
            </div>
            <div></div>
          </CardDiv>
        );
      })}
    </MainDiv>
  );
};
