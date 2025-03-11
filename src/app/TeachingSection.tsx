"use client";
import * as React from "react";
import { Position } from "./types";

const teachings: Position[] = [
  {
    title: "Teaching Assistant in Introduction to Digital Humanities",
    institution: "New York University Abu Dhabi",
    location: "Abu Dhabi, United Arab Emirates",
    period: "Sep. 2023",
    details: ["Hosted by Prof. David Wrisley"],
  },
  {
    title: "Teaching Assistant in Visualizations for Data Science",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2022 – Dec. 2022",
    details: ["Hosted by Prof. Stefan Jänicke"],
  },
  {
    title: "Teaching Assistant in Comparative Literature",
    institution: "University of Southern Denmark",
    location: "Leipzig, Germany",
    period: "Feb. 2022 – Mar. 2022",
  },
  {
    title: "Teaching Assistant in Visualizations for Data Science",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2021 – Dec. 2021",
    details: ["Hosted by Prof. Stefan Jänicke"],
  },
  {
    title: "Teaching Assistant in Digital Humanities",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Sep. 2021 – Dec. 2021",
    details: ["Hosted by Prof. Stefan Jänicke"],
  },
];

export const TeachingSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full bg-white text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">
        Teaching Experience
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
