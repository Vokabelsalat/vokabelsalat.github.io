"use client";
import * as React from "react";
import { EnvelopeIcon, HomeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

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
        <div className="z-0 pb-3.5 my-auto text-4xl text-neutral-700 justify-center flex">
          JAKOB KUSNICK
        </div>

        <div className="flex w-full justify-between gap-3">
          <a
            href="mailto:kusnick@imada.sdu.dk"
            className="flex items-center gap-1 text-xs text-blue-400"
          >
            <EnvelopeIcon className="size-4" />
            kusnick@imada.sdu.dk
          </a>
          <a
            href="https://www.google.dk/maps/@55.3713664,10.4267776,12z?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="flex items-center gap-1 text-xs text-blue-400"
          >
            <HomeIcon className="size-4" />
            Odense, Denmark
          </a>
          <div className="flex items-center gap-1 text-xs text-blue-400">
            <PhoneIcon className="size-4" />
            +45 71 48 53 00
          </div>
        </div>
      </div>
    </header>
  );
};
