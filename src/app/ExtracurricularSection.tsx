"use client";
import * as React from "react";
import { Position } from "./types";

const teachings: Position[] = [
  {
    title: "Student Volunteer Chair EuroVis Conference 2024",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "May 2024",
    details: ["Supervised ~30 student volunteers for a week"],
  },
  {
    title: "Board member of Philos network",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Sep. 2021 - Jan. 2024",
    details: [
      "Organizing scientific and social events for PhD students at the Faculty of Science",
    ],
  },
];

export const ExtracurricularSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full bg-white text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">
        Extracurricular Activities
      </h2>
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
          </article>
        ))}
      </div>
    </section>
  );
};
