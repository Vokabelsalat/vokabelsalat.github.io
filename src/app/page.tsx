"use client";
import { BiographySection } from "./BiographySection";
import { InterestsSkillsSection } from "./InterestsSkillsSection";
import { positions, PositionsSection } from "./PositionsSection";
import { ProfileHeader } from "./ProfileHeader";
import { publications, PublicationsSection } from "./PublicationsSection";
import { teachings, TeachingSection } from "./TeachingSection";
import { workshops, WorkshopSection } from "./WorkshopSection";

import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import "@fontsource/open-sans/400.css"; // Specify weight

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import "@fontsource/montserrat/400.css"; // Specify weight
import { JSX, useMemo } from "react";
import EventClusterMap from "./EventClusterMap";
import MultiRowTimeline from "./EventTimeline";
import { ExtracurricularSection, extras } from "./ExtracurricularSection";
import { cityCoordinates } from "./locations";
import { ProjectSection } from "./ProjectSection";
import {
  EventType,
  EventTypeColors,
  MyEvent,
  Position,
  Publication,
  Workshop,
} from "./types";
import { PortfolioSection } from "./PortfolioSection";

const allEvents: Array<MyEvent> = [
  ...positions.map((e) => {
    return {
      title: e.title,
      coordinates: cityCoordinates[e.location],
      location: e.location,
      type: "Position" as EventType,
    };
  }),
  ...teachings.map((e) => {
    return {
      title: e.title,
      coordinates: cityCoordinates[e.location],
      location: e.location,
      type: "Teaching" as EventType,
    };
  }),
  ...extras.map((e) => {
    return {
      title: e.title,
      coordinates: cityCoordinates[e.location],
      location: e.location,
      type: "Position" as EventType,
    };
  }),
  ...workshops.map((e) => {
    return {
      title: e.title,
      coordinates: cityCoordinates[e.location],
      location: e.location,
      type: "Presentation" as EventType,
    };
  }),
];

export type Category = {
  id: string;
  label: string;
  color: string;
  items: Array<
    (Position | Workshop | Publication) & {
      label: string;
      id: string;
      end: Date;
    }
  >;
};

type Categories = Category[];

export default function Page(): JSX.Element {
  const categories: Categories = useMemo(() => {
    return [
      {
        id: "position",
        label: "Position",
        color: EventTypeColors["Position"], // optional, per-category default
        items: positions.map((position, index) => ({
          ...position,
          label: position.title,
          id: `position-${index}`, // Assign a unique id
          end: position.end || new Date(), // Ensure end is always a Date
        })),
      },
      {
        id: "publication",
        label: "Publication",
        color: EventTypeColors["Publication"], // optional, per-category default
        items: publications.map((publication, index) => ({
          ...publication,
          label: publication.title,
          id: `publication-${index}`, // Assign a unique id
          start: new Date(`${publication.year}-01-01`),
          end: new Date(`${publication.year}-12-31`),
        })),
      },
      {
        id: "presentation",
        label: "Presentation",
        color: EventTypeColors["Presentation"], // optional, per-category default
        items: workshops.map((teaching, index) => ({
          ...teaching,
          label: teaching.title,
          id: `teaching-${index}`, // Assign a unique id
          end: teaching.end || new Date(), // Ensure end is always a Date
        })),
      },
      {
        id: "teaching",
        label: "Teaching",
        color: EventTypeColors["Teaching"], // optional, per-category default
        items: teachings.map((teaching, index) => ({
          ...teaching,
          label: teaching.title,
          id: `teaching-${index}`, // Assign a unique id
          end: teaching.end || new Date(), // Ensure end is always a Date
        })),
      },
    ];
  }, []);

  return (
    <main className="flex items-center pt-4 bg-white justify-center">
      <article className="max-w-3xl flex-1 shrink pb-4 w-full basis-0 relative">
        <ProfileHeader />
        <div className="relative">
          <div id="biography" className="scroll-mt-37 section">
            <BiographySection />
          </div>
          <div id="overview" className="scroll-mt-37 section">
            <div className="w-full h-48">
              <EventClusterMap events={allEvents} categories={categories} />
            </div>
            <div className="w-full hidden lg:block">
              {/* <EventTimeline events={allEvents} /> */}
              <MultiRowTimeline
                categories={categories}
                domainPaddingDays={10}
                rowHeight={30}
                tickEvery={"month"}
                onItemClick={(item) => console.log(item)}
              />
            </div>
          </div>
          <div id="positions" className="scroll-mt-37 section">
            <PositionsSection />
          </div>
          <div id="skills" className="scroll-mt-37 section">
            <InterestsSkillsSection />
          </div>
          <div id="teaching" className="scroll-mt-37 section">
            <TeachingSection />
          </div>
          <div id="publications" className="scroll-mt-37 section">
            <PublicationsSection />
          </div>
          <div id="projects" className="scroll-mt-37 section">
            <ProjectSection />
          </div>
          <div id="extracurricular" className="scroll-mt-37 section">
            <ExtracurricularSection />
          </div>
          <div id="workshops" className="scroll-mt-37 section">
            <WorkshopSection />
          </div>
          <div id="portfolio" className="scroll-mt-37 section">
            <PortfolioSection />
          </div>
        </div>
      </article>
    </main>
  );
}
