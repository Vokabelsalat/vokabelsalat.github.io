"use client";
import * as React from "react";

export const BiographySection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">
        Short Bio
      </h2>
      <article className="flex gap-2.5 items-start w-full text-xs max-md:max-w-full">
        <p className="flex-1 shrink w-full basis-0 min-w-60 max-md:max-w-full">
          My current postdoctoral research focuses on bridging the gap between
          complex data systems and users through visualization and storytelling.
          With my expertise in data collection, processing, and visualization, I
          aim to create intuitive interfaces that make advanced databases and
          decision support systems accessible to experts across diverse domains,
          such as digital humanities, cultural heritage, musicology, art
          history, and life sciences. I strive to enhance user engagement and
          comprehensive insights into sociological interconnections with
          techniques like faceted browsing within coupled visualizations. My
          work also emphasizes making these complex topics more accessible
          through the integration of interactive, visual storytelling,
          uncovering hidden narratives within both tangible and intangible
          subject matters. The applications I develop invite experts and casual
          users to explore and analyze data, enabling them to tell their own
          stories.
        </p>
      </article>
    </section>
  );
};
