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

type SectionLink = {
  href: string;
  label: string;
};

const contactLinks: ContactLink[] = [
  {
    href: "mailto:kusnick@imada.sdu.dk",
    label: "Mail",
    icon: <EnvelopeIcon className="size-5" />,
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

const sectionLinks: SectionLink[] = [
  { href: "#biography", label: "Biography" },
  // { href: "#overview", label: "Overview" },
  { href: "#positions", label: "Positions" },
  { href: "#skills", label: "Skills" },
  { href: "#teaching", label: "Teaching" },
  { href: "#publications", label: "Publications" },
  { href: "#projects", label: "Projects" },
  { href: "#extracurricular", label: "Extra" },
  { href: "#workshops", label: "Workshops" },
  { href: "#portfolio", label: "Portfolio" },
];

export const ProfileHeader: React.FC = () => {
  return (
    <header className="w-full bg-white max-md:px-5 sticky top-0 border-b-1 border-gray-200 z-10 shadow">
      <div className="flex justify-between items-center px-6 py-2.5">
        <div className="relative flex size-24">
          <Image
            src="/image001-1.jpg"
            fill={true}
            alt="Jakob Kusnick profile"
            className="rounded object-cover"
          />
        </div>
        <div className="grid grid-cols-1 grid-rows-[auto_min-content] w-fit justify-self-center text-neutral-700">
          <div className="z-0 my-auto text-lg lg:text-2xl xl:text-4xl justify-center flex">
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
                href={link.href}/*  */
                className="flex flex-col items-center justify-center text-center text-tiny text-blue-400 group hover:text-neutral-800"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <div className="size-5 fill-blue-400">{link.icon}</div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <nav className="px-6 pb-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600 justify-center mt-1">
        {sectionLinks.map((link) => (
          <React.Fragment key={link.href}>
            <a
              href={link.href}
              className="text-blue-400 hover:text-neutral-900 hover:underline transition-colors"
            >
              {link.label}
            </a>
          </React.Fragment>
        ))}
      </nav>
    </header >
  );
};
