"use client";
import * as React from "react";
import { Publication } from "./types";
import { PublicationEntry } from "./PublicationEntry";

const publications: Publication[] = [
  {
    title:
      "Visual analysis of diversity and threat status of natural materials for musical instruments",
    year: "2024",
    authors:
      "J. Kusnick, S. Lichtenberg, D. Wiegreffe, E. Huber-Sannwald, U. Nehren, and S. Jänicke",
    reference: "Frontiers in Environmental Science 12 (2024): 1406376.",
    doi: "https://doi.org/10.3389/fenvs.2024.1406376",
  },
  {
    title: "Visualization-based Storytelling for Digital Humanities",
    year: "2024",
    authors: "J. Kusnick",
    reference: "Ph.D. Thesis",
    doi: "https://doi.org/10.21996/p6we-qy75",
  },
  {
    title:
      "Every Thing Can Be a Hero! Narrative Visualization of Person, Object, and Other Biographies",
    year: "2024",
    authors:
      "J. Kusnick, E. Mayr, K. Seirafi, S. Beck, J. Liem, and F. Windhager",
    reference: "Informatics 11 (2), 26",
    doi: "https://doi.org/10.3390/informatics11020026",
  },
  {
    title:
      "A Workflow Approach to Visualization-Based Storytelling with Cultural Heritage Data",
    year: "2023",
    authors: "J. Liem, J. Kusnick, S. Beck, F. Windhager, and E. Mayr",
    reference:
      "IEEE 8th Workshop on Visualization for the Digital Humanities (VIS4DH)",
    doi: "https://doi.org/10.1109/VIS4DH60378.2023.00008",
  },
  {
    title:
      "Visualization-based Scrollytelling of Coupled Threats for Biodiversity, Species and Music Cultures",
    year: "2023",
    authors: "J. Kusnick, S. Lichtenberg, and S. Jänicke",
    reference:
      "Workshop on Visualisation in Environmental Sciences (EnvirVis), The Eurographics Association",
    doi: "https://doi.org/10.2312/envirvis.20231112",
  },
  {
    title:
      "The Multiple Faces of Cultural Heritage: Towards an Integrated Visualization Platform for Tangible and Intangible Cultural Assets",
    year: "2022",
    authors:
      "E. Mayr, F. Windhager, J. Liem, S. Beck, S. Koch, J. Kusnick, and S. Jänicke",
    reference:
      "IEEE 7th Workshop on Visualization for the Digital Humanities (VIS4DH)",
    doi: "https://doi.org/10.1109/VIS4DH57440.2022.00008",
  },
  {
    title:
      "A Timeline Metaphor for Analyzing the Relationships between Musical Instruments and Musical Pieces",
    year: "2020",
    authors: "J. Kusnick, R. Khulusi, J. Focht, and S. Jänicke",
    reference:
      "Proceedings of the 11th International Conference on Information Visualization Theory and Applications (IVAPP)",
    doi: "https://doi.org/10.5220/0008990502400251",
  },
  {
    title: "musiXplora: Visual Analysis of Musicological Data",
    year: "2020",
    authors: "R. Khulusi, J. Kusnick, J. Focht, and S. Jänicke",
    reference:
      "Proceedings of the 11th International Conference on Information Visualization Theory and Applications (IVAPP)",
    doi: "https://doi.org/10.5220/0008977100760087",
  },
  {
    title: "A Survey on Visualizations for Musical Data",
    year: "2020",
    authors:
      "R. Khulusi, J. Kusnick, C. Meinecke, C. Gillmann, J. Focht, and S. Jänicke",
    reference: "Computer Graphics Forum, 2020",
    doi: "https://doi.org/10.1111/cgf.13905",
  },
  {
    title:
      "Design and Implementation of an Application for the Interactive Visualization of Computed Tomography Data in the Context of Museums",
    year: "2018",
    authors: "J. Kusnick",
    reference: "Master Thesis, Leipzig University, Leipzig, Germany",
    doi: "",
  },
  {
    title:
      "In Viso – An Interactive Application for Controlling and Visualizing of Chromatin Simulations",
    year: "2016",
    authors: "J. Kusnick",
    reference: "Bachelor Thesis, Leipzig University, Leipzig, Germany",
    doi: "",
  },
];

export const PublicationsSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-6 py-2.5 w-full bg-white max-md:px-5 max-md:max-w-full">
      <h2 className="gap-2.5 self-start text-lg text-neutral-700 font-[Montserrat]">
        Selected Publications
      </h2>

      {publications.map((publication, index) => (
        <PublicationEntry key={index} publication={publication} />
      ))}

      <div className="pt-5 pb-2 w-full max-md:max-w-full">
        <p className="overflow-hidden flex-1 shrink w-full text-xs font-bold basis-0 text-neutral-700 max-md:max-w-full">
          To find a complete list of publications please refer to:
        </p>
        <div className="overflow-hidden mt-2.5 w-full text-xs text-blue-400 max-md:max-w-full">
          <a
            href="https://scholar.google.de/citations?hl=de&user=9A5PfmYAAAAJ&view_op=list_works"
            className="underline block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar
          </a>
          <a
            href="https://portal.findresearcher.sdu.dk/en/persons/kusnick"
            className="underline block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pure
          </a>
        </div>
      </div>
    </section>
  );
};
