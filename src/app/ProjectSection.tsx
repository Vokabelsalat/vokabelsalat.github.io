"use client";
import * as React from "react";
import { Position } from "./types";
import Link from "next/link";

const teachings: Position[] = [
  {
    title: "AlgaeProBANOS",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Jul. 2025 - now",
    details: ["Hosted by Prof. Tariq Yousef"],
    link: "https://algaeprobanos.eu",
  },
  {
    title: "MEMORISE",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Nov. 2023 - now",
    details: ["Hosted by Prof. Stefan Jänicke"],
    link: "https://memorise.sdu.dk",
  },
  {
    title: "MusEcology",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Nov. 2019 - now",
    link: "https://www.vises.sdu.dk",
  },
  {
    title:
      "InTaVia - Visual Analysis, Curation & Communication for In/Tangible European Heritage",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2020 – Oct. 2023",
    details: ["Hosted by Prof. Stefan Jänicke"],
    link: "https://intavia.eu",
  },
  {
    title: "TASTEN",
    institution: "University of Southern Denmark",
    location: "Leipzig, Germany",
    period: "Feb. 2018 – Jul. 2020",
    details: ["Hosted by Prof. Josef Focht"],
    link: "https://mfm.uni-leipzig.de/dt/Forschung/Tastenprojekt.php",
  },
];

export const ProejctSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full bg-neutral-100 text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">Projects</h2>
      <div className="w-full text-xs max-md:max-w-full">
        {teachings.map((teaching, index) => (
          <article key={index} className="py-2 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full min-h-4 max-md:max-w-full">
              <h3 className="font-bold">{teaching.title}</h3>
              <p>{teaching.period}</p>
            </div>
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full mt-1">
              <p>{teaching.institution}</p>
              <p>{teaching.location}</p>
            </div>
            {teaching.details?.map((detail, detailIndex) => (
              <p
                key={detailIndex}
                className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
              >
                {detail}
              </p>
            ))}
            {teaching.link && (
              <Link
                target="_blank"
                href={teaching.link}
                className="text-blue-400"
                // className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
              >
                {teaching.link}
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
