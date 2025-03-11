"use client";
import * as React from "react";
import { Publication } from "./types";

interface PublicationEntryProps {
  publication: Publication;
}

export const PublicationEntry: React.FC<PublicationEntryProps> = ({
  publication,
}) => {
  return (
    <article className="py-2 w-full max-md:max-w-full">
      <div className="flex overflow-hidden justify-between items-start w-full text-xs text-neutral-700 max-md:max-w-full gap-5">
        <h3 className="flex-1 shrink font-bold basis-0 max-md:max-w-full">
          {publication.title}
        </h3>
        <p>{publication.year}</p>
      </div>
      <div className="flex overflow-hidden gap-8 justify-between items-start w-full mt-1">
        <div className="text-xs text-neutral-700">{publication.authors}</div>
        {publication.doi && (
          <a
            href={publication.doi}
            className="text-xs text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {publication.doi}
          </a>
        )}
      </div>
      <p className="overflow-hidden flex-1 shrink w-full text-xs basis-0 text-neutral-700 max-md:max-w-full mt-0.5 italic">
        {publication.reference}
      </p>
    </article>
  );
};
