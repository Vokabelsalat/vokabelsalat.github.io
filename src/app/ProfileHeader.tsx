"use client";
import * as React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleScholar, faLinkedin, faOrcid, faResearchgate } from "@fortawesome/free-brands-svg-icons";

type ContactLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
};

const contactLinks: ContactLink[] = [
  {
    href: "mailto:kusnick@imada.sdu.dk",
    label: "Mail",
    icon: <EnvelopeIcon className="size-4" />,
  },
  {
    href: "https://scholar.google.de/citations?hl=de&user=9A5PfmYAAAAJ&view_op=list_works",
    label: "Google Scholar",
    icon: <FontAwesomeIcon className="scale-160" icon={faGoogleScholar} />,
    external: true,
  },
  {
    href: "https://orcid.org/0000-0002-1653-6614",
    label: "ORCID",
    icon: <FontAwesomeIcon className="scale-160" icon={faOrcid} />,
    external: true,
  },
  {
    href: "https://www.researchgate.net/profile/Jakob-Kusnick",
    label: "Research Gate",
    icon: <FontAwesomeIcon className="scale-160" icon={faResearchgate} />,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/jakob-kusnick-496208242/",
    label: "LinkedIn",
    icon: <FontAwesomeIcon className="scale-160" icon={faLinkedin} />,
    external: true,
  },
];

export const ProfileHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-2.5 w-full bg-white max-md:px-5 sticky top-0 border-b-1 border-gray-200 z-10">
      <div className="relative flex size-24">
        <Image
          src="/image001-1.jpg"
          fill={true}
          alt="Jakob Kusnick profile"
          className="rounded object-cover"
        />
      </div>
      <div className="grid grid-cols-1 grid-rows-[auto_min-content] w-fit justify-self-center">
        <div className="z-0 my-auto text-lg lg:text-2xl xl:text-4xl text-neutral-700 justify-center flex">
          Jakob Kusnick
        </div>
        <div className="flex text-center justify-center text-sm lg:text-base mt-1">Postdoctoral Research Fellow</div>
        <div className="flex text-center justify-center text-xs">Center for Digital Narrative</div>
        <div className="flex text-center justify-center text-xs">University of Bergen, Norway</div>
      </div>
      <div className="grid grid-cols-2 self-center gap-1">
        {contactLinks.map((link, i) => (
          <div className={`size-5 relative ${i === 0 ? "col-span-2" : ""}`} key={`test-${i}`}>
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col items-center text-center text-tiny text-blue-400 group"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              <div className="size-5 fill-blue-400">{link.icon}</div>
              {/* <div className="opacity-0 group-hover:opacity-100 bg-white group-hover:z-50 p-1">{link.label}</div> */}
            </a>
          </div>
        ))}
        {/* <a
            href="https://maps.app.goo.gl/pTdtsDBQTR4Wkpoe7"
            target="_blank"
            className="flex items-center gap-1 text-xs text-blue-400"
          >
            <HomeIcon className="size-4" />
            Bergen, Norway
          </a> */}
      </div>
    </header >
  );
};
