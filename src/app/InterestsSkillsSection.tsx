"use client";
import * as React from "react";
import { TableEntry } from "./types";
import {
  BookOpenIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

const interests: TableEntry[] = [
  { text: "Data Visualization" },
  { text: "Narrative Visualization" },
  { text: "Visual Data Science" },
  { text: "Digital Humanities" },
  { text: "Cultural Heritage" },
  { text: "Information Retrieval" },
  { text: "Life Sciences" },
];

const skills: TableEntry[] = [
  { text: "JavaScript, Python, PHP, Java, C, C++" },
  { text: "HTML, CSS, React, Django" },
  { text: "Custom Visualizations via d3.js, threejs, Mapbox GL JS, Plotly" },
  { text: "Collaborative Work in Research & Development Projects" },
  { text: "German (native), English (advanced)" },
  { text: "French (basic), Danish (basic)" },
];

export const InterestsSkillsSection: React.FC = () => {
  return (
    <section className="grid grid-cols-2 text-neutral-700 px-6 py-2.5 text-xs">
      {/* <section className="flex overflow-hidden flex-wrap justify-between items-start px-6 py-2.5 w-full text-xs bg-neutral-100 text-neutral-700 max-md:px-5 max-md:max-w-full"> */}
      <div className="flex flex-col shrink basis-0 min-w-60 h-full justify-between">
        <h2 className="gap-2.5 self-start text-lg whitespace-nowrap font-[Montserrat]">
          Interests
        </h2>
        {interests.map((interest, index) => (
          <div key={index} className="flex flex-col items-start w-full">
            <div className="flex flex-col justify-center py-0.5 max-w-full min-h-6">
              <p className="flex overflow-hidden gap-1.5 items-center w-full font-bold">
                <BookOpenIcon className="size-4" />
                <span className="self-stretch my-auto">{interest.text}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-1 shrink items-start basis-0 min-w-60 h-full justify-between">
        <h2 className="gap-2.5 self-stretch text-lg whitespace-nowrap font-[Montserrat]">
          Skills
        </h2>
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col justify-center py-1 w-full max-w-full min-h-[30px]"
          >
            <p className="flex overflow-hidden gap-1.5 items-center w-full font-bold">
              <PresentationChartLineIcon className="size-4" />
              <span
                className="self-stretch my-auto"
                dangerouslySetInnerHTML={{ __html: skill.text }}
              />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
