import type { Metadata } from "next";
import { CVBuilder } from "./CVBuilder";

export const metadata: Metadata = {
  title: "Build an academic CV — Jakob Kusnick",
  description: "Select entries and download a tailored academic CV as a PDF.",
};

export default function CVPage() {
  return <CVBuilder />;
}
