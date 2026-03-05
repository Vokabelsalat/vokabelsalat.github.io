"use client";
import * as React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleScholar, faLinkedin, faOrcid, faResearchgate } from "@fortawesome/free-brands-svg-icons";

export const ProfileHeader: React.FC = () => {
  return (
    <header className="grid grid-cols-[min-content_auto] grid-rows-1 items-center px-6 py-2.5 w-full bg-white max-md:px-5 sticky top-0 border-b-1 border-gray-200 z-10">
      <div className="relative flex size-18">
        <Image
          src="/image001-1.jpg"
          fill={true}
          alt="Jakob Kusnick profile"
          className="rounded-full object-cover"
        />
      </div>
      {/*       <figure className="hover:animate-pulse flex overflow-hidden relative z-0 flex-col items-start self-stretch my-auto min-h-[100px] rounded-[99px] w-[100px]">
        <div className="flex absolute right-0 bottom-0 z-0 bg-neutral-200 h-[100px] min-h-[100px] w-[100px]" />
      </figure> */}

      <div className="grid grid-cols-1 grid-rows-[auto_min-content] w-fit justify-self-center">
        <div className="z-0 my-auto text-4xl text-neutral-700 justify-center flex">
          Jakob Kusnick
        </div>
        <div className="flex justify-center mt-1">Postdoctoral Research Fellow</div>
        <div className="flex justify-center text-xs">Center for Digital Narrative</div>
        <div className="flex justify-center text-xs">University of Bergen, Norway</div>

        <div className="flex w-full justify-between gap-3 mt-2">
          <a
            href="mailto:kusnick@imada.sdu.dk"
            className="flex flex-col items-center text-tiny text-blue-400"
          >
            <EnvelopeIcon className="size-4" />
            Mail
          </a>
          <a
            href="https://scholar.google.de/citations?hl=de&user=9A5PfmYAAAAJ&view_op=list_works"
            className="flex flex-col items-center text-tiny text-blue-400"
          >
            <div className="size-4 fill-blue-400">
              <FontAwesomeIcon className="scale-140" icon={faGoogleScholar} />
            </div>
            Google Scholar
          </a>
          <a
            href="https://orcid.org/0000-0002-1653-6614"
            className="flex flex-col items-center text-tiny text-blue-400"
          >
            <div className="size-4 fill-blue-400">
              <FontAwesomeIcon className="scale-140" icon={faOrcid} />
            </div>
            ORCID
          </a>
          <a
            href="https://www.researchgate.net/profile/Jakob-Kusnick"
            className="flex flex-col items-center text-tiny text-blue-400"
          >
            <div className="size-4 fill-blue-400">
              <FontAwesomeIcon className="scale-140" icon={faResearchgate} />
            </div>
            Research Gate
          </a>
          <a
            href="https://www.linkedin.com/in/jakob-kusnick-496208242/"
            className="flex flex-col items-center text-tiny text-blue-400"
          >
            <div className="size-4 fill-blue-400">
              <FontAwesomeIcon className="scale-140" icon={faLinkedin} />
            </div>
            LinkedIn
          </a>
          {/* <a
            href="https://maps.app.goo.gl/pTdtsDBQTR4Wkpoe7"
            target="_blank"
            className="flex items-center gap-1 text-xs text-blue-400"
          >
            <HomeIcon className="size-4" />
            Bergen, Norway
          </a> */}
        </div>
      </div>
    </header >
  );
};
