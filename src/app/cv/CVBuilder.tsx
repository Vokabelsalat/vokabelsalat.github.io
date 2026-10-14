"use client";

import { ArrowLeftIcon, CheckIcon, DocumentArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { extras } from "../ExtracurricularSection";
import { positions } from "../PositionsSection";
import { projects } from "../ProjectSection";
import { publications } from "../PublicationsSection";
import { teachings } from "../TeachingSection";
import { ThemeToggle } from "../ThemeToggle";
import { workshops } from "../WorkshopSection";

type CVItem = {
  id: string;
  title: string;
  date: string;
  lines: string[];
  details?: string[];
  links?: string[];
};

type CVSection = {
  id: string;
  title: string;
  items: CVItem[];
};

type PreviewPage = {
  sections: CVSection[];
};

const profileOptions = [
  { id: "profile-photo", title: "Profile photo" },
  { id: "profile-bio", title: "Short bio" },
];

const shortBio =
  "I am a postdoctoral researcher at the Center for Digital Narrative at the University of Bergen, within the LEAD AI programme. My current projects explore how visualization and storytelling can make complex data systems understandable and usable. In Narrative Nubs, I develop interactive visualizations that help people compare story generators, inspect their outputs, and understand how the generation process works. My previous work spans digital humanities, cultural heritage, musicology, art history, and the life sciences.";

const sections: CVSection[] = [
  {
    id: "positions",
    title: "Positions & Education",
    items: positions.map((item, index) => ({
      id: `positions-${index}`,
      title: item.title,
      date: item.period,
      lines: [`${item.institution} · ${item.location}`],
      details: item.details,
      links: item.link ? [item.link] : undefined,
    })),
  },
  {
    id: "publications",
    title: "Publications",
    items: publications.map((item, index) => ({
      id: `publications-${index}`,
      title: item.title,
      date: item.year,
      lines: [item.authors, item.reference],
      links: item.doi ? [item.doi] : undefined,
    })),
  },
  {
    id: "projects",
    title: "Projects",
    items: projects.map((item, index) => ({
      id: `projects-${index}`,
      title: item.title,
      date: item.period,
      lines: [`${item.institution} · ${item.location}`],
      details: item.details,
      links: item.links ?? (item.link ? [item.link] : undefined),
    })),
  },
  {
    id: "teaching",
    title: "Teaching Experience",
    items: teachings.map((item, index) => ({
      id: `teaching-${index}`,
      title: item.title,
      date: item.period,
      lines: [`${item.institution} · ${item.location}`],
      details: item.details,
    })),
  },
  {
    id: "presentations",
    title: "Presentations & Workshops",
    items: workshops.map((item, index) => ({
      id: `presentations-${index}`,
      title: item.title,
      date: item.date,
      lines: [item.authors || "", `${item.institution} · ${item.location}`].filter(Boolean),
      details: item.details,
      links: item.link ? [item.link] : undefined,
    })),
  },
  {
    id: "service",
    title: "Academic Service",
    items: extras.map((item, index) => ({
      id: `service-${index}`,
      title: item.title,
      date: item.period,
      lines: [`${item.institution} · ${item.location}`],
      details: item.details,
    })),
  },
];

const allIds = [
  ...profileOptions.map((option) => option.id),
  ...sections.flatMap((section) => section.items.map((item) => item.id)),
];

const imageToDataUrl = async (src: string) => {
  const response = await fetch(src);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

function Checkbox({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className="group flex w-full items-start gap-3 text-left cursor-pointer"
    >
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${checked ? "border-content bg-content text-surface" : "border-line bg-surface group-hover:border-content-muted"
          }`}
        aria-hidden="true"
      >
        {checked && <CheckIcon className="size-3.5 stroke-3" />}
      </span>
      <span className="text-sm leading-5 text-content">{label}</span>
    </button>
  );
}

export function CVBuilder() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(allIds));
  const selectedSections = useMemo(
    () => sections.map((section) => ({ ...section, items: section.items.filter((item) => selected.has(item.id)) })).filter((section) => section.items.length),
    [selected],
  );
  const previewPages = useMemo<PreviewPage[]>(() => {
    const textLines = (text: string, charactersPerLine: number) => Math.max(1, Math.ceil(text.length / charactersPerLine));
    const itemSize = (item: CVItem) =>
      0.3 +
      textLines(item.title, 90) +
      item.lines.reduce((total, line) => total + textLines(line, 115), 0) +
      (item.details?.reduce((total, detail) => total + textLines(detail, 105), 0) || 0) +
      (item.links?.filter((link) => link.startsWith("http")).length || 0) * 0.6;

    const pages: PreviewPage[] = [{ sections: [] }];
    let currentPage = pages[0];
    let remaining = selected.has("profile-bio") ? 45 : 58;
    let pageHasBodyContent = selected.has("profile-bio");

    selectedSections.forEach((section) => {
      let currentPageSection: CVSection | null = null;

      section.items.forEach((item) => {
        const size = itemSize(item);
        const required = size + (currentPageSection ? 0 : 1.5);

        if (required > remaining && pageHasBodyContent) {
          currentPage = { sections: [] };
          pages.push(currentPage);
          remaining = 65;
          pageHasBodyContent = false;
          currentPageSection = null;
        }

        if (!currentPageSection) {
          currentPageSection = { ...section, items: [] };
          currentPage.sections.push(currentPageSection);
          remaining -= 1.5;
        }

        currentPageSection.items.push(item);
        remaining -= size;
        pageHasBodyContent = true;
      });
    });

    return pages;
  }, [selected, selectedSections]);

  const toggleItem = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSection = (section: CVSection) => {
    const fullySelected = section.items.every((item) => selected.has(item.id));
    setSelected((current) => {
      const next = new Set(current);
      section.items.forEach((item) => fullySelected ? next.delete(item.id) : next.add(item.id));
      return next;
    });
  };

  const downloadPDF = async () => {
    const includePhoto = selected.has("profile-photo");
    const includeBio = selected.has("profile-bio");
    let photoData: string | null = null;
    if (includePhoto) {
      try {
        photoData = await imageToDataUrl("/image001-1.jpg");
      } catch {
        photoData = null;
      }
    }

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 14;
    const right = 196;
    const bodyWidth = right - left;
    const bottom = 287;
    let y = 14;

    const addPage = () => {
      doc.addPage();
      y = 14;
    };

    const ensureRoom = (height: number) => {
      if (y + height > bottom) addPage();
    };

    const writeWrapped = (text: string, x: number, width: number, lineHeight: number, style: "normal" | "bold" | "italic" = "normal") => {
      doc.setFont("helvetica", style);
      const lines = doc.splitTextToSize(text, width) as string[];
      doc.text(lines, x, y);
      y += lines.length * lineHeight;
    };

    doc.setTextColor(23, 23, 23);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text("Jakob Kusnick", left, y);
    if (photoData) doc.addImage(photoData, "JPEG", 174, 14, 22, 22);
    y += 5.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Postdoctoral Research Fellow · Center for Digital Narrative · University of Bergen", left, y);
    y += 4.2;
    doc.setTextColor(45, 105, 170);
    doc.setFontSize(8.5);
    doc.textWithLink("jakob.kusnick@uib.no", left, y, { url: "mailto:jakob.kusnick@uib.no" });
    doc.textWithLink("ORCID: 0000-0002-1653-6614", left + 44, y, { url: "https://orcid.org/0000-0002-1653-6614" });
    doc.textWithLink("Google Scholar", left + 109, y, { url: "https://scholar.google.de/citations?user=9A5PfmYAAAAJ" });
    y += 3.7;
    doc.textWithLink("Full CV: kusnick.com", left, y, { url: "https://kusnick.com" });
    y = photoData ? 40 : y + 5.5;
    doc.setDrawColor(190, 190, 190);
    doc.line(left, y, right, y);
    y += 4.5;

    if (includeBio) {
      doc.setTextColor(23, 23, 23);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.text("Profile", left, y);
      y += 4.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      writeWrapped(shortBio, left, bodyWidth, 3.6);
      y += 3;
    }

    selectedSections.forEach((section) => {
      ensureRoom(14);
      doc.setTextColor(23, 23, 23);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.text(section.title, left, y);
      y += 4.5;

      section.items.forEach((item) => {
        const estimatedLines = doc.splitTextToSize(item.title, 128).length + item.lines.reduce((sum, line) => sum + doc.splitTextToSize(line, bodyWidth).length, 0) + (item.details?.length || 0) + (item.links?.filter((link) => link.startsWith("http")).length || 0);
        ensureRoom(Math.max(10.5, estimatedLines * 3.4 + 3.5));
        doc.setTextColor(23, 23, 23);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        const dateWidth = 34;
        const titleLines = doc.splitTextToSize(item.title, bodyWidth - dateWidth) as string[];
        doc.text(titleLines, left, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.3);
        doc.text(item.date, right, y, { align: "right" });
        y += titleLines.length * 3.6;

        doc.setFontSize(8.3);
        item.lines.forEach((line) => writeWrapped(line, left, bodyWidth, 3.4));
        item.details?.forEach((detail) => {
          doc.setTextColor(75, 75, 75);
          writeWrapped(detail, left + 3, bodyWidth - 3, 3.4, "italic");
        });
        item.links?.filter((link) => link.startsWith("http")).forEach((link) => {
          doc.setTextColor(45, 105, 170);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          const displayLink = link.replace(/^https?:\/\/(dx\.)?doi\.org\//, "doi: ").replace(/^https?:\/\//, "");
          doc.textWithLink(displayLink, left, y, { url: link });
          y += 3.3;
        });
        y += 1.8;
      });
      y += 1;
    });

    const totalPages = doc.getNumberOfPages();
    for (let page = 1; page <= totalPages; page += 1) {
      doc.setPage(page);
      doc.setTextColor(120, 120, 120);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`${page} / ${totalPages}`, right, 292, { align: "right" });
    }

    doc.save("Jakob-Kusnick-academic-CV.pdf");
  };

  const downloadDOCX = async () => {
    const {
      AlignmentType,
      BorderStyle,
      Document,
      ExternalHyperlink,
      Footer,
      HeadingLevel,
      ImageRun,
      Packer,
      PageNumber,
      Paragraph,
      Table,
      TableCell,
      TableLayoutType,
      TableRow,
      TextRun,
      WidthType,
    } = await import("docx");

    const includePhoto = selected.has("profile-photo");
    const includeBio = selected.has("profile-bio");
    const children: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [];
    const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const contactRuns = [
      new ExternalHyperlink({
        link: "mailto:jakob@kusnick.com",
        children: [new TextRun({ text: "jakob@kusnick.com", style: "Hyperlink" })],
      }),
      new TextRun("   "),
      new ExternalHyperlink({
        link: "https://orcid.org/0000-0002-1653-6614",
        children: [new TextRun({ text: "ORCID 0000-0002-1653-6614", style: "Hyperlink" })],
      }),
      new TextRun("   "),
      new ExternalHyperlink({
        link: "https://scholar.google.de/citations?user=9A5PfmYAAAAJ",
        children: [new TextRun({ text: "Google Scholar", style: "Hyperlink" })],
      }),
    ];

    const identityParagraphs = [
      new Paragraph({ text: "Jakob Kusnick", heading: HeadingLevel.TITLE, spacing: { after: 40 } }),
      new Paragraph({
        children: [new TextRun("Postdoctoral Research Fellow · Center for Digital Narrative · University of Bergen")],
        spacing: { after: 50 },
      }),
      new Paragraph({ children: contactRuns, spacing: { after: 20 } }),
      new Paragraph({
        children: [new ExternalHyperlink({
          link: "https://kusnick.com",
          children: [new TextRun({ text: "Full CV: kusnick.com", style: "Hyperlink" })],
        })],
        spacing: { after: 60 },
      }),
    ];

    if (includePhoto) {
      const photoResponse = await fetch("/image001-1.jpg");
      const photo = new Uint8Array(await photoResponse.arrayBuffer());
      children.push(new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        columnWidths: [7600, 1700],
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
        rows: [new TableRow({
          children: [
            new TableCell({ width: { size: 82, type: WidthType.PERCENTAGE }, children: identityParagraphs }),
            new TableCell({
              width: { size: 18, type: WidthType.PERCENTAGE },
              children: [new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new ImageRun({ data: photo, type: "jpg", transformation: { width: 84, height: 84 } })],
              })],
            }),
          ],
        })],
      }));
      children.push(new Paragraph({ spacing: { after: 20 } }));
    } else {
      children.push(...identityParagraphs);
    }

    if (includeBio) {
      children.push(
        new Paragraph({ text: "Profile", heading: HeadingLevel.HEADING_1, keepNext: true }),
        new Paragraph({ text: shortBio, spacing: { after: 100, line: 240 } }),
      );
    }

    selectedSections.forEach((section) => {
      children.push(new Paragraph({ text: section.title, heading: HeadingLevel.HEADING_1, keepNext: true }));
      section.items.forEach((item) => {
        const itemParagraphs = [new Paragraph({
          spacing: { before: 40, after: 20 },
          children: [
            new TextRun({ text: item.title, bold: true }),
            new TextRun({ text: ` — ${item.date}` }),
          ],
        })];
        item.lines.forEach((line) => itemParagraphs.push(new Paragraph({ text: line, spacing: { after: 10 } })));
        item.details?.forEach((detail) => itemParagraphs.push(new Paragraph({
          children: [new TextRun({ text: detail, italics: true, color: "555555" })],
          indent: { left: 180 },
          spacing: { after: 10 },
        })));
        const itemLinks = item.links?.filter((link) => link.startsWith("http")) || [];
        if (itemLinks.length) {
          itemLinks.forEach((link) => {
            const displayLink = link.replace(/^https?:\/\/(dx\.)?doi\.org\//, "doi: ");
            itemParagraphs.push(new Paragraph({
              children: [new ExternalHyperlink({
                link,
                children: [new TextRun({ text: displayLink, style: "Hyperlink" })],
              })],
            }));
          });
        } else {
          itemParagraphs.push(new Paragraph({ spacing: { after: 20 } }));
        }
        children.push(...itemParagraphs);
        children.push(new Paragraph({ spacing: { after: 30 } }));
      });
    });

    const wordDocument = new Document({
      creator: "Jakob Kusnick",
      title: "Jakob Kusnick Academic CV",
      description: "Academic curriculum vitae generated from selected entries.",
      styles: {
        default: {
          document: { run: { font: "Arial", size: 18, color: "171717" }, paragraph: { spacing: { line: 228 } } },
          title: { run: { font: "Arial", size: 36, bold: true, color: "000000" }, paragraph: { spacing: { after: 40 } } },
          heading1: { run: { font: "Arial", size: 23, bold: true, color: "000000" }, paragraph: { spacing: { before: 140, after: 60 } } },
        },
      },
      sections: [{
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 794, right: 794, bottom: 794, left: 794 },
          },
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ children: [PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES], size: 15, color: "777777" })],
            })],
          }),
        },
        children,
      }],
    });

    const blob = await Packer.toBlob(wordDocument);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Jakob-Kusnick-academic-CV.docx";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-surface text-content">
      <header className="sticky top-0 z-20 border-b border-line bg-surface shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-link transition-colors hover:text-link-hover">
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            Jakob Kusnick
          </Link>
          <h1 className="font-[Montserrat] text-lg sm:text-xl">Academic CV builder</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-8 lg:grid-cols-[minmax(19rem,0.78fr)_minmax(32rem,1.22fr)] lg:px-8">
        <aside className="lg:sticky lg:top-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-[Montserrat] text-xl">Choose entries</h2>
              <p className="mt-1 text-sm text-content-muted">{selected.size} of {allIds.length} elements selected</p>
            </div>
            <div className="flex gap-3 text-sm">
              <button type="button" onClick={() => setSelected(new Set(allIds))} className="cursor-pointer text-link hover:text-link-hover hover:underline">All</button>
              <button type="button" onClick={() => setSelected(new Set())} className="cursor-pointer text-link hover:text-link-hover hover:underline">Clear</button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-15rem)] space-y-5 overflow-y-auto pr-3 max-lg:max-h-none max-lg:overflow-visible">
            <section className="border-t border-line pt-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-[Montserrat] text-base">Profile</h3>
                <button
                  type="button"
                  onClick={() => {
                    const fullySelected = profileOptions.every((option) => selected.has(option.id));
                    setSelected((current) => {
                      const next = new Set(current);
                      profileOptions.forEach((option) => fullySelected ? next.delete(option.id) : next.add(option.id));
                      return next;
                    });
                  }}
                  className="cursor-pointer text-sm text-link hover:text-link-hover hover:underline"
                >
                  {profileOptions.every((option) => selected.has(option.id)) ? "Remove all" : "Select all"}
                </button>
              </div>
              <div className="space-y-3">
                {profileOptions.map((option) => (
                  <Checkbox key={option.id} checked={selected.has(option.id)} label={option.title} onChange={() => toggleItem(option.id)} />
                ))}
              </div>
            </section>
            {sections.map((section) => {
              const count = section.items.filter((item) => selected.has(item.id)).length;
              return (
                <section key={section.id} className="border-t border-line pt-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-[Montserrat] text-base">{section.title}</h3>
                    <button type="button" onClick={() => toggleSection(section)} className="cursor-pointer text-sm text-link hover:text-link-hover hover:underline">
                      {count === section.items.length ? "Remove all" : "Select all"}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <Checkbox key={item.id} checked={selected.has(item.id)} label={`${item.title} (${item.date})`} onChange={() => toggleItem(item.id)} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </aside>

        <section aria-label="CV preview">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-[Montserrat] text-xl">Preview</h2>
              <p className="mt-1 text-sm text-content-muted">A4 preview · {previewPages.length} {previewPages.length === 1 ? "page" : "pages"}</p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={downloadDOCX}
                disabled={selected.size === 0}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-content px-4 py-2.5 text-sm font-bold text-content transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-35"
              >
                <DocumentTextIcon className="size-5" aria-hidden="true" />
                Editable DOCX
              </button>
              <button
                type="button"
                onClick={downloadPDF}
                disabled={selected.size === 0}
                className="flex cursor-pointer items-center gap-2 rounded-md bg-content px-4 py-2.5 text-sm font-bold text-surface transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <DocumentArrowDownIcon className="size-5" aria-hidden="true" />
                PDF
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {previewPages.map((page, pageIndex) => (
              <article key={pageIndex} className="cv-paper relative overflow-hidden bg-white px-[5.5%] py-[5.5%] text-neutral-900 shadow-lg">
                {pageIndex === 0 && (
                  <header className="border-b border-neutral-300 pb-[2%]">
                    <div className="flex items-start justify-between gap-[4%]">
                      <div>
                        <h2 className="font-[Montserrat] text-[clamp(1.1rem,2.7vw,1.7rem)] font-bold tracking-tight">Jakob Kusnick</h2>
                        <p className="mt-[0.5%] text-[clamp(0.48rem,1.1vw,0.8rem)] leading-snug">Postdoctoral Research Fellow · Center for Digital Narrative · University of Bergen</p>
                        <div className="mt-[2%] flex flex-wrap gap-x-[4%] gap-y-0.5 text-[clamp(0.46rem,0.95vw,0.7rem)] text-blue-700">
                          <a href="mailto:jakob.kusnick@uib.no">jakob.kusnick@uib.no</a>
                          <a href="https://orcid.org/0000-0002-1653-6614">ORCID: 0000-0002-1653-6614</a>
                          <a href="https://scholar.google.de/citations?user=9A5PfmYAAAAJ">Google Scholar</a>
                        </div>
                        <a href="https://kusnick.com" className="mt-[0.5%] block text-[clamp(0.46rem,0.95vw,0.7rem)] text-blue-700">Full CV: kusnick.com</a>
                      </div>
                      {selected.has("profile-photo") && (
                        <Image
                          src="/image001-1.jpg"
                          width={112}
                          height={112}
                          alt="Jakob Kusnick"
                          className="size-[clamp(3.25rem,8vw,6rem)] shrink-0 rounded object-cover"
                        />
                      )}
                    </div>
                  </header>
                )}

                {selected.size ? (
                  <div className={`${pageIndex === 0 ? "pt-[2%]" : ""} space-y-[1.1%]`}>
                    {pageIndex === 0 && selected.has("profile-bio") && (
                      <section>
                        <h3 className="mb-[0.5%] font-[Montserrat] text-[clamp(0.58rem,1.2vw,0.9rem)] font-bold">Profile</h3>
                        <p className="text-[clamp(0.44rem,0.82vw,0.625rem)] leading-[1.25]">{shortBio}</p>
                      </section>
                    )}
                    {page.sections.map((section) => (
                      <section key={`${pageIndex}-${section.id}`}>
                        <h3 className="mb-[0.5%] font-[Montserrat] text-[clamp(0.58rem,1.2vw,0.9rem)] font-bold">{section.title}</h3>
                        <div className="space-y-[0.55%]">
                          {section.items.map((item) => (
                            <article key={item.id} className="text-[clamp(0.44rem,0.82vw,0.625rem)] leading-[1.25]">
                              <div className="grid grid-cols-[1fr_auto] gap-[4%]">
                                <h4 className="font-bold">{item.title}</h4>
                                <p className="whitespace-nowrap">{item.date}</p>
                              </div>
                              {item.lines.map((line) => <p key={line}>{line}</p>)}
                              {item.details?.map((detail) => <p key={detail} className="italic text-neutral-600">{detail}</p>)}
                              {item.links?.filter((link) => link.startsWith("http")).map((link) => (
                                <a key={link} href={link} className="block break-all text-blue-700">
                                  {link.replace(/^https?:\/\/(dx\.)?doi\.org\//, "doi: ")}
                                </a>
                              ))}
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[70%] items-center justify-center text-center text-[clamp(0.5rem,1vw,0.75rem)] text-neutral-500">
                    Select at least one entry to compose the CV.
                  </div>
                )}
                <p className="absolute bottom-[2.5%] right-[4%] text-[clamp(0.45rem,0.9vw,0.625rem)] text-neutral-500">{pageIndex + 1} / {previewPages.length}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
