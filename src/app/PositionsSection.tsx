"use client";
import * as React from "react";
import { Position } from "./types";

export const positions: Position[] = [
  // {
  //   title: "Postdoctoral Researcher",
  //   institution: "University of Southern Denmark",
  //   location: "Odense, Denmark",
  //   period: "Oct. 2024 – Present",
  //   details: ["Hosted by Prof. Stefan Jänicke & Prof. Tariq Yousef"],
  // },
  // {
  //   title: "Ph.D. Student in Computer Science",
  //   institution: "University of Southern Denmark",
  //   location: "Odense, Denmark",
  //   period: "Nov. 2020 – Sep. 2024",
  //   details: [
  //     "Supervised by Prof. Stefan Jänicke",
  //     '"Visualization-based Storytelling for Digital Humanities"',
  //   ],
  // },
  // {
  //   title: "Doctoral Student",
  //   institution: "Museum of Musical Instruments of Leipzig University",
  //   location: "Leipzig, Germany",
  //   period: "Feb. 2018 – Oct. 2020",
  // },
  // {
  //   title: "B.Sc. & M.Sc. in Computer Science",
  //   institution: "Leipzig University",
  //   location: "Leipzig, Germany",
  //   period: "Oct. 2012 – Feb. 2018",
  // },
  {
    title: "Postdoctoral Researcher",
    institution: "University of Bergen",
    location: "Bergen, Norway",
    period: "Jan. 2026 – Present",
    details: ["Hosted by Prof. Nick Montfort"],
    type: "range",
    start: new Date("2026-01-01"),
    end: new Date(), // ongoing
  },
  {
    title: "Postdoctoral Researcher",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2024 – Dec. 2025",
    details: ["Hosted by Prof. Stefan Jänicke & Prof. Tariq Yousef"],
    type: "range",
    start: new Date("2024-10-01"),
    end: new Date("2025-12-31"),
  },
  {
    title: "Ph.D. Student in Computer Science",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Nov. 2020 – Sep. 2024",
    details: [
      "Supervised by Prof. Stefan Jänicke",
      '"Visualization-based Storytelling for Digital Humanities"',
    ],
    type: "range",
    start: new Date("2020-11-01"),
    end: new Date("2024-09-30"),
  },
  {
    title: "Doctoral Student",
    institution: "Museum of Musical Instruments of Leipzig University",
    location: "Leipzig, Germany",
    period: "Feb. 2018 – Oct. 2020",
    type: "range",
    start: new Date("2018-02-01"),
    end: new Date("2020-10-31"),
  },
  {
    title: "M.Sc. in Computer Science",
    institution: "Leipzig University",
    location: "Leipzig, Germany",
    period: "Oct. 2015 – Feb. 2018",
    type: "range",
    start: new Date("2015-10-01"),
    end: new Date("2018-02-28"),
  },
];

export const PositionsSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">
        Positions & Education
      </h2>
      <div className="w-full text-xs max-md:max-w-full">
        {positions.map((position, index) => (
          <article key={index} className="py-2 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full min-h-4 max-md:max-w-full">
              <h3 className="font-bold font-[Montserrat]">{position.title}</h3>
              <p>{position.period}</p>
            </div>
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full mt-1">
              <p>{position.institution}</p>
              <p>{position.location}</p>
            </div>
            {position.details?.map((detail, detailIndex) => (
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
