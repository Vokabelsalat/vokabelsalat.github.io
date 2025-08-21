"use client";
import * as React from "react";
import { BiographySection } from "./BiographySection";
import { TeachingSection } from "./TeachingSection";
import { InterestsSkillsSection } from "./InterestsSkillsSection";
import { PublicationsSection } from "./PublicationsSection";
import { ProfileHeader } from "./ProfileHeader";
import { PositionsSection } from "./PositionsSection";
import { WorkshopSection } from "./WorkshopSection";

import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import { JSX } from "react";
import { PortfolieSection } from "./PortfolieSection";
import { ProejctSection } from "./ProjectSection";
import { ExtracurricularSection } from "./ExtracurricularSection";

export default function Page(): JSX.Element {
  return (
    <main className="flex items-center pt-4 bg-white justify-center">
      <article className="max-w-3xl flex-1 shrink pb-4 w-full basis-0 relative">
        <ProfileHeader />
        <div className="relative">
          <BiographySection />
          <PositionsSection />
          <TeachingSection />
          <InterestsSkillsSection />
          <PublicationsSection />
          <ProejctSection />
          <ExtracurricularSection />
          <WorkshopSection />
          <PortfolieSection />
        </div>
      </article>
    </main>
  );
}
