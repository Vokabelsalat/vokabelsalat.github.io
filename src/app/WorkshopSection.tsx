"use client";
import * as React from "react";
import { Workshop } from "./types";
import Link from "next/link";

const workshops: Workshop[] = [
  {
    title:
      "Teaching Difficult History with Digital Tools: Telling the Story of Nazi Euthanasia",
    institution: "University of Sussex",
    authors: "E. Rachow, C. Vang Østergaard, J. Kusnick, and C. Hall",
    location: "Sussex, United Kingdom",
    date: "25. June 2025",
    details: [
      "Half-Day Workshop",
      "Part of the Connective Holocaust Commemoration Expo I, 24.-26. June 2025",
    ],
    link: "https://reframe.sussex.ac.uk/digitalholocaustmemory/connective-holocaust-commemoration-expo-i/",
  },
  {
    title: "Working with the InTaVia Platform",
    institution: "There’s History in All Men’s Lives",
    authors: "S. Beck, and J. Kusnick",
    location: "Ljubljana, Slovenia",
    date: "26. Sep. 2023",
    link: "https://intavia.eu/newsletters/intavia-4th-newsletter/",
    details: ["Presentation"],
  },
  {
    title: "Narrative Visualization of Cultural Information",
    institution: "Digital Humanities Conference 2023",
    authors: "C. Doppler, J. Kusnick, and E. Mayr",
    location: "Graz, Austria",
    date: "9. July 2023",
    details: [
      "Presentation & Podium Discussion",
      "Part of Smashing the Silos! The Future of Cultural Heritage Information and Visualization, 9. July 2023",
    ],
    link: "https://intavia.eu/activities/smashing-the-silos-the-future-of-cultural-heritage-information-and-visualization/",
  },
  {
    title: "Data Driven Storytelling for Cultural Objects and Biographies",
    institution: "Digital Humanities Conference 2023",
    authors:
      "J.Liem, J. Kusnick, S. Jänicke, C. Doppler, M. Passecker, E. Mayr, and F. Windhager",
    location: "Belval, Luxembourg",
    date: "14. Mar. 2023",
    details: [
      "Half-Day Workshop",
      "Part of the 'Digital Humanities im deutschsprachigen Raum' Conference, 13-17 Mar. 2023, Belval, Luxembourg",
    ],
    link: "http://dhd2023.dig-hum.de/",
  },
  // Johannes Liem, Jakob Kusnick, Steffan Jänicke, Carina Doppler, Markus Passecker, Eva Mayr, Florian Windhager Data Driven Storytelling zu kulturellen Objekten und Biographien 14.3.2023 Luxemburg
];

export const WorkshopSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full bg-neutral-100 text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">
        Presentations & Workshops
      </h2>
      <div className="w-full text-xs max-md:max-w-full">
        {workshops.map((workshop, index) => (
          <article key={index} className="py-2 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full min-h-4 max-md:max-w-full">
              <h3 className="font-bold">{workshop.title}</h3>
              <p>{workshop.date}</p>
            </div>
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full mt-1">
              <p>{workshop.authors}</p>
              <p>{workshop.location}</p>
            </div>
            <div className="mt-1">
              <p>{workshop.institution}</p>
              {workshop.details?.map((detail, detailIndex) => (
                <p
                  key={detailIndex}
                  className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
                >
                  {detail}
                </p>
              ))}
              {workshop.link && (
                <Link
                  target="_blank"
                  href={workshop.link}
                  className="text-blue-400"
                  // className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
                >
                  {workshop.link}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
