"use client";
import * as React from "react";
import { Workshop } from "./types";
import Link from "next/link";

export const workshops: Workshop[] = [
  //   {
  //     title: "Guest Lecture on Narrative Visualizations",
  //     institution: "York University",
  //     authors: "J. Kusnik",
  //     location: "Toronto, Canada",
  //     date: "1. Oct. 2025",
  //     details: ["Hosted by Prof. Lora Appel"],
  //   },
  //   {
  //     title:
  //       "Teaching Difficult History with Digital Tools: Telling the Story of Nazi Euthanasia",
  //     institution: "University of Sussex",
  //     authors: "E. Rachow, C. Vang Østergaard, J. Kusnick, and C. Hall",
  //     location: "Sussex, United Kingdom",
  //     date: "25. June 2025",
  //     details: [
  //       "Half-Day Workshop",
  //       "Part of the Connective Holocaust Commemoration Expo I, 24.-26. June 2025",
  //     ],
  //     link: "https://reframe.sussex.ac.uk/digitalholocaustmemory/connective-holocaust-commemoration-expo-i/",
  //   },
  //   {
  //     title:
  //       "Visualization-Based Storytelling in Holocaust Education: The Integration of Testimonies, Art, and Technology",
  //     institution: "George Mason University",
  //     authors: "J. Kusnick",
  //     location: "Arlington, VA, United States",
  //     date: "7. Aug. 2024",
  //     details: [
  //       "Poster",
  //       "Part of the Digital Humanities Conference 2024, 6.-9. Aug. 2024",
  //     ],
  //     link: "/DHWashingtonPoster.png",
  //   },
  //   {
  //     title: "Working with the InTaVia Platform",
  //     institution: "There’s History in All Men’s Lives",
  //     authors: "S. Beck, and J. Kusnick",
  //     location: "Ljubljana, Slovenia",
  //     date: "26. Sep. 2023",
  //     link: "https://intavia.eu/newsletters/intavia-4th-newsletter/",
  //     details: ["Presentation"],
  //   },
  //   {
  //     title: "Narrative Visualization of Cultural Information",
  //     institution: "Digital Humanities Conference 2023",
  //     authors: "C. Doppler, J. Kusnick, and E. Mayr",
  //     location: "Graz, Austria",
  //     date: "9. July 2023",
  //     details: [
  //       "Presentation & Podium Discussion",
  //       "Part of Smashing the Silos! The Future of Cultural Heritage Information and Visualization, 9. July 2023",
  //     ],
  //     link: "https://intavia.eu/activities/smashing-the-silos-the-future-of-cultural-heritage-information-and-visualization/",
  //   },
  //   {
  //     title: "Data Driven Storytelling for Cultural Objects and Biographies",
  //     institution: "Digital Humanities Conference 2023",
  //     authors:
  //       "J.Liem, J. Kusnick, S. Jänicke, C. Doppler, M. Passecker, E. Mayr, and F. Windhager",
  //     location: "Belval, Luxembourg",
  //     date: "14. Mar. 2023",
  //     details: [
  //       "Half-Day Workshop",
  //       "Part of the 'Digital Humanities im deutschsprachigen Raum' Conference, 13-17 Mar. 2023, Belval, Luxembourg",
  //     ],
  //     link: "http://dhd2023.dig-hum.de/",
  //   },
  //   // Johannes Liem, Jakob Kusnick, Steffan Jänicke, Carina Doppler, Markus Passecker, Eva Mayr, Florian Windhager Data Driven Storytelling zu kulturellen Objekten und Biographien 14.3.2023 Luxemburg
  {
    title: "Mapping Algae: Connecting Farmers, Products, and Markets",
    institution: "EX-AQUA",
    authors: "J. Kusnick",
    location: "Constanța, Romania",
    date: "30. Oct. 2025",
    details: [
      "Presentation",
      "Part of the Workshop “Advancing algae aquaculture: innovative pathways for the Black Sea region”, 30. Oct. 2025",
    ],
    link: "https://ex-aqua.eu/highlights-from-the-workshop-advancing-algae-aquaculture-innovation-and-collaboration-for-the-black-sea",
    type: "point",
    start: new Date("2025-10-30"),
  },
  {
    title:
      "Santa Clara 3D: Digital Reconstruction and Storytelling of a Francoist Concentration Camp",
    institution: "CHIRA 2025",
    authors: "S. Zacho, C. Hall, J. Kusnick, and S. Jänicke",
    location: "Marbella, Spain",
    date: "21. Oct. 2025",
    details: [
      "Presentation",
      "Part of the 9. International Conference on Computer-Human Interaction Research and Applications (CHIRA), 20.–21. Oct. 2025",
    ],
    link: "https://www.insticc.org/Primoris/api/TechnicalProgram/DownloadBookofAbstract?id=3991",
    type: "point",
    start: new Date("2025-10-21"),
  },
  {
    title:
      "Teaching Difficult History with Digital Tools: Telling the Story of Nazi Euthanasia",
    institution: "University of Sussex",
    authors: "E. Rachow, C. Vang Østergaard, J. Kusnick, and C. Hall",
    location: "Sussex, United Kingdom",
    date: "25. June 2025",
    details: [
      "Half-Day Workshop",
      "Part of the Connective Holocaust Commemoration Expo I, 24.-26. June 2025",
    ],
    link: "https://reframe.sussex.ac.uk/digitalholocaustmemory/connective-holocaust-commemoration-expo-i/",
    type: "point",
    start: new Date("2025-06-25"),
  },
  {
    title: "Opening Ceremony of the Ferramonti 3D Exhibition Panel",
    institution: "Ferramonti di Tarsia",
    authors: "O. A. Bendorf, C. Hall, R. Mreisheh, J. Kusnick, and S. Jänicke",
    location: "Tarsia, Italy",
    date: "13. June 2025",
    details: [],
    link: "/Ferramonti-Opening.jpeg",
    type: "point",
    start: new Date("2025-06-13"),
  },
  {
    title:
      "Visualization-Based Storytelling in Holocaust Education: The Integration of Testimonies, Art, and Technology",
    institution: "George Mason University",
    authors: "J. Kusnick",
    location: "Arlington, VA, United States",
    date: "7. Aug. 2024",
    details: [
      "Poster",
      "Part of the Digital Humanities Conference 2024, 6.-9. Aug. 2024",
    ],
    link: "/DHWashingtonPoster.png",
    type: "point",
    start: new Date("2024-08-07"),
  },
  {
    title: "Working with the InTaVia Platform",
    institution: "There’s History in All Men’s Lives",
    authors: "S. Beck, and J. Kusnick",
    location: "Ljubljana, Slovenia",
    date: "26. Sep. 2023",
    link: "https://intavia.eu/newsletters/intavia-4th-newsletter/",
    details: ["Presentation"],
    type: "point",
    start: new Date("2023-09-26"),
  },
  {
    title: "Narrative Visualization of Cultural Information",
    institution: "Digital Humanities Conference 2023",
    authors: "C. Doppler, J. Kusnick, and E. Mayr",
    location: "Graz, Austria",
    date: "9. July 2023",
    details: [
      "Presentation & Podium Discussion",
      "Part of Smashing the Silos! The Future of Cultural Heritage Information and Visualization, 9. July 2023",
    ],
    link: "https://intavia.eu/activities/smashing-the-silos-the-future-of-cultural-heritage-information-and-visualization/",
    type: "point",
    start: new Date("2023-07-09"),
  },
  {
    title: "Data Driven Storytelling for Cultural Objects and Biographies",
    institution: "Digital Humanities Conference 2023",
    authors:
      "J.Liem, J. Kusnick, S. Jänicke, C. Doppler, M. Passecker, E. Mayr, and F. Windhager",
    location: "Belval, Luxembourg",
    date: "14. Mar. 2023",
    details: [
      "Half-Day Workshop",
      "Part of the 'Digital Humanities im deutschsprachigen Raum' Conference, 13-17 Mar. 2023, Belval, Luxembourg",
    ],
    link: "http://dhd2023.dig-hum.de/",
    type: "point",
    start: new Date("2023-03-14"),
  },
];

export const WorkshopSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full text-neutral-700 max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg font-[Montserrat]">
        Presentations & Workshops
      </h2>
      <div className="w-full text-xs max-md:max-w-full">
        {workshops.map((workshop, index) => (
          <article key={index} className="py-2 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full min-h-4 max-md:max-w-full">
              <h3 className="font-bold">{workshop.title}</h3>
              <p>{workshop.date}</p>
            </div>
            <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full mt-1">
              <p>{workshop.authors}</p>
              <p>{workshop.location}</p>
            </div>
            <div className="mt-1">
              <p>{workshop.institution}</p>
              {workshop.details?.map((detail, detailIndex) => (
                <p
                  key={detailIndex}
                  className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
                >
                  {detail}
                </p>
              ))}
              {workshop.link && (
                <Link
                  target="_blank"
                  href={workshop.link}
                  className="text-blue-400"
                  // className="overflow-hidden w-full max-md:max-w-full italic mt-0.5"
                >
                  {workshop.link}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
