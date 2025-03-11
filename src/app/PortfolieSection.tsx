"use client";
import * as React from "react";

import Image from "next/image";

const entries = [
  {
    title: "Explore Prisoner Artworks",
    images: ["/touchscreen.jpg", "/workInTheCamp.jpeg"],
    caption:
      "The interactive prisoner art explorer allows you to inspect details in a watercolor painting of a perspective view of the Bergen-Belsen Concentration  Camp and offers a guided storytelling tour through the various details of the painting. This is currently exhibited at the memorial of Bergen-Belsen, Germany. 2024",
    links: ["https://memoriseeu.github.io "],
  },
  {
    title: "The Building History of the Vienna Hofburg",
    images: ["/informatics-11-00026-g009-2.jpeg"],
    caption:
      "The story tells the construction history of the Hofburg in Vienna from its founding in the 13th century until today, featuring historic drawings, plans, prints, and 3D renderings in augmented reality. 2024",
    links: [
      "https://youtu.be/VfMtttzMtJ4",
      "https://doi.org/10.3390/informatics11020026",
    ],
  },
  {
    title: "The Story of the Stringed Instrument Bow",
    images: ["/mobileScrollytelling.png", "/concert.jpg"],
    caption:
      "Interactive digital scrollytelling to narrate complex interconnection of cultural and natural heritage across large geographical distances which was also musically performed in concert on an opera stage. 2023",
    links: [
      "https://youtu.be/xN9DIANiD30",
      "https://doi.org/10.2312/envirvis.20231112",
    ],
  },
  {
    title:
      "Interactive Visualization of Computed Tomography Data of Musical Instruments",
    images: ["/Buechsentrompete_transparent.jpeg", "/arDrehleier.jpeg"],
    caption:
      "Playful knowledge transfer within a museum exhibition in virtual and augmented reality. The user should be able to interactively explore digitized exhibits from all sides, look inside them and thus gain new insights. 2018",
    links: ["https://youtu.be/rKs6Jv2Y994?si=PIA90IGri8PYM_oW"],
  },
];

export const PortfolieSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  return (
    <div className="flex flex-col bg-neutral-100 text-neutral-700 px-6 py-2.5 text-xs">
      <h2 className="self-start text-lg font-[Montserrat] mb-3">Portfolio</h2>
      <div className="flex flex-col gap-6.5">
        {entries.map((e, i) => {
          return (
            <div key={`portfolia-${i}`}>
              <div className="grid grid-cols-[70%_30%] grid-rows-[1fr] w-full gap-3 items-start">
                {/* Image Container */}
                <div className="relative w-full h-full max-h-full gap-2 flex overflow-hidden items-start">
                  {e.images.map((img, img_i) => {
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <div key={`imgage-${img_i}`} className="relative h-full">
                        <Image
                          src={img}
                          width={1000}
                          height={500}
                          style={{
                            width: "auto",
                            height: "100%",
                            maxHeight: "400px",
                          }}
                          className="object-contain max-h-full max-w-full cursor-zoom-in hover:animate-pulse"
                          alt={e.caption}
                          onClick={() => setSelectedImage(img)}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* Text Container */}
                <div className="flex flex-col overflow-hidden">
                  <div className="font-bold mb-1">{e.title}</div>
                  <div className="mb-1">{e.caption}</div>
                  {e.links?.map((link, i) => {
                    return (
                      <a
                        key={`link-${i}`}
                        href={link}
                        target="_blank"
                        className="text-blue-400"
                      >
                        {link}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[#000000ba] bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-[90vw] h-[90vh]">
            <Image
              src={selectedImage}
              fill={true}
              alt="Fullscreen"
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
