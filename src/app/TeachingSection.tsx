"use client";
import * as React from "react";
import { Position } from "./types";

export const teachings: Position[] = [
  //   {
  //     title: "Guest Lecturing in Web-Development",
  //     institution: "University of Southern Denmark",
  //     location: "Odense, Denmark",
  //     period: "Mar. 2025",
  //     details: ["Hosted by Prof. Tariq Yousef"],
  //   },
  //   {
  //     title: "Teaching Assistant in Introduction to Digital Humanities",
  //     institution: "New York University Abu Dhabi",
  //     location: "Abu Dhabi, United Arab Emirates",
  //     period: "Sep. 2023",
  //     details: ["Hosted by Prof. David Wrisley"],
  //   },
  //   {
  //     title: "Teaching Assistant in Visualizations for Data Science",
  //     institution: "University of Southern Denmark",
  //     location: "Odense, Denmark",
  //     period: "Oct. 2022 – Dec. 2022",
  //     details: [
  //       "Hosted by Prof. Stefan Jänicke",
  //       "Co-supervised ~110 students with 3 resulting co-authored conference papers",
  //     ],
  //   },
  //   {
  //     title: "Teaching Assistant in Comparative Literature",
  //     institution: "University of Southern Denmark",
  //     location: "Odense, Denmark",
  //     period: "Feb. 2022 – Mar. 2022",
  //     details: ["Hosted by Prof. Sofie Kluge"],
  //   },
  //   {
  //     title: "Teaching Assistant in Visualizations for Data Science",
  //     institution: "University of Southern Denmark",
  //     location: "Odense, Denmark",
  //     period: "Oct. 2021 – Dec. 2021",
  //     details: [
  //       "Hosted by Prof. Stefan Jänicke",
  //       "Co-supervised ~100 students with 3 resulting co-authored conference papers",
  //     ],
  //   },
  //   {
  //     title: "Teaching Assistant in Digital Humanities",
  //     institution: "University of Southern Denmark",
  //     location: "Odense, Denmark",
  //     period: "Sep. 2021 – Dec. 2021",
  //     details: ["Hosted by Prof. Stefan Jänicke"],
  //   },
  {
    title: "Guest Lecture on Narrative Visualizations",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "13. Nov. 2024",
    details: ["Hosted by Prof. Stefan Jänicke"],
    type: "point",
    start: new Date("2024-11-15"),
  },
  {
    title: "Guest Lecture on Narrative Visualizations",
    institution: "York University",
    location: "Toronto, Canada",
    period: "1. Oct. 2025",
    details: ["Hosted by Prof. Lora Appel"],
    type: "point",
    start: new Date("2025-10-01"),
  },
  {
    title: "Guest Lecturing in Web-Development",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Mar. 2025",
    details: ["Hosted by Prof. Tariq Yousef"],
    type: "range",
    start: new Date("2025-03-01"),
    end: new Date("2025-03-30"),
  },
  {
    title: "Guest Lecture on Narrative Visualizations",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "6. Nov. 2024",
    details: ["Hosted by Prof. Stefan Jänicke"],
    type: "point",
    start: new Date("2024-11-06"),
  },
  {
    title: "Teaching Assistant in Introduction to Digital Humanities",
    institution: "New York University Abu Dhabi",
    location: "Abu Dhabi, United Arab Emirates",
    period: "Sep. 2023",
    details: ["Hosted by Prof. David Wrisley"],
    type: "range",
    start: new Date("2023-09-01"),
    end: new Date("2023-09-30"),
  },
  {
    title: "Teaching Assistant in Visualizations for Data Science",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2022 – Dec. 2022",
    details: [
      "Hosted by Prof. Stefan Jänicke",
      "Co-supervised ~110 students with 3 resulting co-authored conference papers",
    ],
    type: "range",
    start: new Date("2022-10-01"),
    end: new Date("2022-12-31"),
  },
  {
    title: "Teaching Assistant in Comparative Literature",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Feb. 2022 – Mar. 2022",
    details: ["Hosted by Prof. Sofie Kluge"],
    type: "range",
    start: new Date("2022-02-01"),
    end: new Date("2022-03-31"),
  },
  {
    title: "Teaching Assistant in Visualizations for Data Science",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2021 – Dec. 2021",
    details: [
      "Hosted by Prof. Stefan Jänicke",
      "Co-supervised ~100 students with 3 resulting co-authored conference papers",
    ],
    type: "range",
    start: new Date("2021-10-01"),
    end: new Date("2021-12-31"),
  },
  {
    title: "Teaching Assistant in Digital Humanities",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Sep. 2021 – Dec. 2021",
    details: ["Hosted by Prof. Stefan Jänicke"],
    type: "range",
    start: new Date("2021-09-01"),
    end: new Date("2021-12-31"),
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
