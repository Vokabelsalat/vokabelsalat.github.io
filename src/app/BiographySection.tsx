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
          I am a postdoctoral researcher at the <a className="underline" href="https://www4.uib.no/en/research/research-centres/center-for-digital-narrative">Center for Digital Narrative</a> at the <a href="https://www4.uib.no/en" className="underline">University of Bergen</a>, within the <a className="underline" href="">LEAD AI</a> programme.<br />
          My current projects explore how visualization and storytelling can make complex data systems understandable and usable.
          In <a href="https://codeberg.org/nickmontfort/narrative-nubs" className="underline">Narrative Nubs</a>, I apply this to story generator systems by developing interactive visualizations: glyphs that summarize and compare generators, and visual views that help users inspect outputs and follow the generation process so the internal logic becomes understandable and open to hands-on exploration.<br />
          My previous work spans domains including digital humanities, cultural heritage, musicology, art history, and the life sciences, adapting interface and visualization methods to different expert practices and audiences.
          {/* My current postdoctoral research focuses on bridging the gap between
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
          uncovering hidden narratives w
          ithin both tangible and intangible
          subject matters. The applications I develop invite experts and casual
          users to explore and analyze data, enabling them to tell their own
          stories. */}
        </p>
      </article>
    </section >
  );
};
