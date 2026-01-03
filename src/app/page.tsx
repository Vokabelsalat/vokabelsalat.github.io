"use client";
import { BiographySection } from "./BiographySection";
import { InterestsSkillsSection } from "./InterestsSkillsSection";
import { positions, PositionsSection } from "./PositionsSection";
import { ProfileHeader } from "./ProfileHeader";
import { PublicationsSection } from "./PublicationsSection";
import { teachings, TeachingSection } from "./TeachingSection";
import { workshops, WorkshopSection } from "./WorkshopSection";

import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import "@fontsource/open-sans/400.css"; // Specify weight

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import "@fontsource/montserrat/400.css"; // Specify weight
import { JSX } from "react";
import EventClusterMap from "./EventClusterMap";
import MultiRowTimeline from "./EventTimeline";
import { ExtracurricularSection, extras } from "./ExtracurricularSection";
import { cityCoordinates } from "./locations";
import { ProjectSection } from "./ProjectSection";
import { EventType, EventTypeColors, MyEvent } from "./types";
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
      type: "Workshop" as EventType,
    };
  }),
];

export default function Page(): JSX.Element {
  return (
    <main className="flex items-center pt-4 bg-white justify-center">
      <article className="max-w-3xl flex-1 shrink pb-4 w-full basis-0 relative">
        <ProfileHeader />
        <div className="relative">
          <BiographySection />
          <section>
            <div className="w-full h-48">
              <EventClusterMap events={allEvents} />
            </div>
            <div className="w-full h-48">
              {/* <EventTimeline events={allEvents} /> */}
              <MultiRowTimeline
                categories={[
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
                  {
                    id: "workshop",
                    label: "Workshops",
                    color: EventTypeColors["Workshop"], // optional, per-category default
                    items: workshops.map((teaching, index) => ({
                      ...teaching,
                      label: teaching.title,
                      id: `teaching-${index}`, // Assign a unique id
                      end: teaching.end || new Date(), // Ensure end is always a Date
                    })),
                  },
                ]}
                domainPaddingDays={10}
                rowHeight={30}
                tickEvery={"month"}
                onItemClick={(item) => console.log(item)}
              />
            </div>
          </section>
          <PositionsSection />
          <InterestsSkillsSection />
          <TeachingSection />
          <PublicationsSection />
          <ProjectSection />
          <ExtracurricularSection />
          <WorkshopSection />
          <PortfolioSection />
        </div>
      </article>
    </main>
  );
}
