"use client";
import * as React from "react";
import { Position } from "./types";
import Link from "next/link";

export const projects: Position[] = [
  {
    title: "Narrative Nubs",
    institution: "University of Bergen",
    location: "Bergen, Norway",
    period: "Jan. 2026 - now",
    details: ["Hosted by Prof. Nick Montfort"],
    links: ["https://codeberg.org/nickmontfort/narrative-nubs",
      "https://nubs.kusnick.com"],
    type: "range",
    start: new Date(2026, 0, 1),
    end: new Date(),
  },
  {
    title: "AlgaeProBANOS",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Jul. 2025 - Dec. 2025",
    details: ["Hosted by Prof. Tariq Yousef"],
    links: ["https://algaeprobanos.eu"],
    type: "range",
    start: new Date(2025, 6, 1),
    end: new Date(2025, 12, 31),
  },
  {
    title: "MEMORISE",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Nov. 2023 - Dec. 2025",
    details: ["Hosted by Prof. Stefan Jänicke"],
    links: ["https://memorise.sdu.dk"],
    type: "range",
    start: new Date(2023, 10, 1),
    end: new Date(2025, 12, 31),
  },
  {
    title: "MusEcology",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Nov. 2019 - now",
    links: ["https://musecology.kusnick.com"],
    type: "range",
    start: new Date(2019, 10, 1),
    end: new Date(),
  },
  {
    title:
      "InTaVia - Visual Analysis, Curation & Communication for In/Tangible European Heritage",
    institution: "University of Southern Denmark",
    location: "Odense, Denmark",
    period: "Oct. 2020 – Oct. 2023",
    details: ["Hosted by Prof. Stefan Jänicke"],
    links: ["https://intavia.eu"],
    type: "range",
    start: new Date(2020, 9, 1),
    end: new Date(2023, 9, 1),
  },
  {
    title: "TASTEN",
    institution: "University of Southern Denmark",
    location: "Leipzig, Germany",
    period: "Feb. 2018 – Jul. 2020",
    details: ["Hosted by Prof. Josef Focht"],
    links: ["https://mfm.uni-leipzig.de/dt/Forschung/Tastenprojekt.php"],
    type: "range",
    start: new Date(2018, 1, 1),
    end: new Date(2020, 6, 1),
  },
];

export const ProjectSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full text-content max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">Projects</h2>
      <div className="w-full text-xs max-md:max-w-full">
        {projects.map((project, index) => (
          <article key={index} className="py-2 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full min-h-4 max-md:max-w-full">
              <h3 className="font-bold">{project.title}</h3>
              <p>{project.period}</p>
            </div>
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full mt-1">
              <p>{project.institution}</p>
              <p>{project.location}</p>
            </div>
            {project.details?.map((detail, detailIndex) => (
              <p
                key={detailIndex}
                className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
              >
                {detail}
              </p>
            ))}
            {(project.links ?? (project.link ? [project.link] : [])).map((link) => (
              <Link
                key={link}
                target="_blank"
                href={link}
                className="block w-fit break-all text-link hover:text-link-hover"
              >
                {link}
              </Link>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
};
