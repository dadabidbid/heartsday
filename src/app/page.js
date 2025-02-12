"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFlowers, setSelectedFlowers] = useState([]); // Holds up to 8 flowers
  const [isFinished, setIsFinished] = useState(false); // Track if "Finish" is clicked
  const [isBouquetMoved, setIsBouquetMoved] = useState(false); // Track bouquet movement
  const [showLoveMessage, setShowLoveMessage] = useState(false); // Controls text change

  const images = [
    { src: "/red1.png", alt: "Red Flower" },
    { src: "/white1.png", alt: "White Flower" },
    { src: "/pinkwhite1.png", alt: "Pink & White Flower" },
    { src: "/purple1.png", alt: "Purple Flower" },
    { src: "/red2.png", alt: "Red Flower 2" },
    { src: "/white2.png", alt: "White Flower 2" },
    { src: "/yellow1.png", alt: "Yellow Flower" },
    { src: "/orange1.png", alt: "Orange Flower" },
    { src: "/pruple2.png", alt: "Purple Flower 2" },
    { src: "/blue1.png", alt: "Blue Flower" },
    { src: "/yellow2.png", alt: "Yellow Flower 2"},
    { src: "/yellow3.png", alt: "Yellow Flower 3" },
    { src: "/blue2.png", alt: "Blue Flower 2" },

  ];

  const totalImages = images.length;
  const visibleCount = 4;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const getVisibleImages = () => {
    return Array.from({ length: visibleCount }, (_, i) =>
      images[(currentIndex + i) % totalImages]
    );
  };

  const addFlowerToBouquet = (flower) => {
    if (selectedFlowers.length < 8) {
      setSelectedFlowers([...selectedFlowers, { ...flower, flipped: false }]);
    }
  };

  const removeLastFlower = () => {
    if (selectedFlowers.length > 0) {
      setSelectedFlowers(selectedFlowers.slice(0, -1));
    }
  };

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      {/* Circular Background */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2 z-[-1]"></div>


      {/* Bouquet Container */}
      <div
        className={`flex items-center justify-center w-full transition-transform duration-1000 ${
          isBouquetMoved ? "translate-y-32" : ""
        }`}
      >
        <div className="relative w-[250px] h-[250px] top-[160px] left-2/8 transform -translate-x-1/2">
          
          {/* Back Layer */}
          <Image
            src="/bouquet_back.png"
            width={250}
            height={250}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/6 -translate-y-1/9 z-0"
            alt="Bouquet Back"
          />

          {/* Placed Flowers */}
          {selectedFlowers.map((flower, index) => {
  let top, left;
  
  if (index < 3) {
    top = "30%";
    left = `${65 + index * 30}%`;
  } else if (index < 6) {
    top = "60%";
    left = `${65 + (index - 3) * 30}%`;
  } else {
    top = "90%";
    left = `${90 + (index - 6) * 10}%`;
  }

  // Adjust size if it's yellow2
  const isYellow2 = flower.src === "/yellow2.png";
  const flowerWidth = isYellow2 ? 125 : 200; // Smaller size for yellow2
  const flowerHeight = isYellow2 ? 125 : 200;

  return (
    <Image
      key={index}
      src={flower.src}
      width={flowerWidth}
      height={flowerHeight}
      className="absolute z-5 transition-all"
      style={{
        top,
        left,
        transform: `translate(-50%, -50%) rotate(-10deg) ${flower.flipped ? 'scaleX(-1)' : ''}`,
      }}
      alt={flower.alt}
    />
  );
})}


          {/* Front Layer */}
          <Image
            src="/bouquet_front.png"
            width={250}
            height={250}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/6 -translate-y-1/9 z-10"
            alt="Bouquet Front"
          />
        </div>
      </div>

      {/* Hide buttons & carousel when finished */}
      {!isFinished && (
        <>
          {/* Flower Selection Carousel */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 flex items-center justify-between rounded-lg w-2/4 max-w-2xl">
            <button onClick={handlePrev} className="text-white hover:brightness-75 transition-all text-lg">
              <Image src="/play.png" width={60} height={60} alt="Previous" className="rotate-180" />
            </button>
            <div className="flex overflow-hidden w-full justify-center gap-4">
              {getVisibleImages().map((image, index) => (
                <div key={index} className="flex flex-col items-center w-[80px]">
                  <div
                    onClick={() => addFlowerToBouquet(image)}
                    className="w-[80px] h-[100px] flex items-center justify-center bg-[#ff8fab] rounded-lg overflow-hidden hover:brightness-75 transition-all cursor-pointer"
                  >
                    <Image src={image.src} width={80} height={100} className="object-cover" alt={image.alt} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="text-white hover:brightness-75 transition-all text-lg">
              <Image src="/play.png" width={60} height={60} alt="Next" />
            </button>
          </div>

          {/* Buttons */}
          <button
            className="fixed bottom-16 left-[calc(50%-750px)] rounded-full transition-colors bg-foreground text-background h-10 px-4 sm:h-12 sm:px-5"
            onClick={() => {
              setIsFinished(true);
              setIsBouquetMoved(true);
            }}
          >
            Finish
          </button>

          <button
            className="fixed bottom-16 left-[calc(50%-550px)] rounded-full transition-colors bg-foreground text-background h-10 px-4 sm:h-12 sm:px-5"
            onClick={() => setSelectedFlowers([])}
          >
            Reset Bouquet
          </button>

          <button
            className="fixed bottom-16 left-[calc(50%+400px)] rounded-full transition-colors bg-foreground text-background h-10 px-4 sm:h-12 sm:px-5"
            onClick={removeLastFlower}
          >
            Remove Last Flower
          </button>
          <button
            className="fixed bottom-16 left-[calc(50%+650px)] rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => {
              if (selectedFlowers.length > 0) {
                const updatedFlowers = [...selectedFlowers];
                updatedFlowers[selectedFlowers.length - 1].flipped = !updatedFlowers[selectedFlowers.length - 1].flipped;
                setSelectedFlowers([...updatedFlowers]);
              }
            }}
          >
            Flip Flower
          </button>
        </>
      )}

      {/* Valentine Text (Changes After Yes is Clicked) */}
      {isFinished && (
  <>
    <h1
      className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-4xl font-bold animate-fade-in"
      style={{ fontFamily: "Brilliant", color: "#fb6f92" }}
    >
      {showLoveMessage ? "I love you ❤️" : "Will you be my Valentine?"}
    </h1>

    {/* Show buttons only if Yes hasn't been clicked */}
    {!showLoveMessage && (
      <>
        {/* No Button */}
        <button
          className="fixed bottom-25 left-[10%] rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg sm:text-xl h-16 sm:h-20 px-8 sm:px-12"
        >
          No
        </button>

        {/* Yes Button */}
        <button
          className="fixed bottom-25 left-[85%] rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg sm:text-xl h-16 sm:h-20 px-8 sm:px-12"
          onClick={() => setShowLoveMessage(true)}
        >
          Yes
        </button>
      </>
    )}
  </>
)}


    </div>
  );
}
