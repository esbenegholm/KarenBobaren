import React, { useEffect, useState } from "react";

const theme = {
  bg: "bg-[#FAFAFA]",
  text: "text-[#222222]",
  border: "border-[#eaeaea]",
};

const logs = [
  {
    slug: "first-lattes",
    title: "Iced lattes & nervous laughs",
    date: "2025-05-04",
    location: "Local café",
    heroImage: "/images/logs/first-lattes.jpg",
    excerpt:
      "I still hear the clink of ice and your laugh when I think about that first hour…",
    body: [
      "Karen, I didn’t expect a two-hour coffee to feel like ten minutes.",
      "You always find the funny angle before I find the words.",
      "I learned that day that comfortable can happen fast, and I loved that.",
    ],
    photos: [
      { src: "/images/logs/first-lattes-1.jpg", caption: "The iced latte ring" },
      { src: "/images/logs/first-lattes-2.jpg", caption: "That smile." },
    ],
    tags: ["firsts"],
  },
  {
    slug: "rain-walk",
    title: "Walk in the rain",
    date: "2025-06-10",
    location: "Neighborhood",
    heroImage: "/images/logs/rain-walk.jpg",
    excerpt:
      "We dodged puddles, shared earbuds, and let the streetlights blur into gold.",
    body: [
      "You tucked your hand into my sleeve like it belonged there.",
      "A tiny thing that made me smile: your hair doing that curl at the ends.",
      "Wish for us: more walks, more weather, same us.",
    ],
    photos: [],
    tags: ["everyday"],
  },
];

const timeline = [
  {
    id: "messages",
    date: "2025-04-01",
    title: "First messages",
    blurb: "Memes, late replies, and a suspicious number of exclamation points.",
    photo: "/images/timeline/first-messages.jpg",
  },
  {
    id: "coffee",
    date: "2025-05-04",
    title: "First coffee date",
    blurb: "Iced lattes, no plan, somehow everything to say.",
    photo: "/images/timeline/first-date.jpg",
  },
  {
    id: "rain",
    date: "2025-06-10",
    title: "Rain walk",
    blurb: "Shared earbuds + puddle jumping.",
  },
  {
    id: "friends",
    date: "2025-07-12",
    title: "Met the friends",
    blurb: "Stories, teasing, and you fitting in like you’ve always been there.",
  },
];

const albums = [
  {
    name: "Everyday",
    photos: [
      { src: "/images/gallery/bignose.jpeg", caption: "BIG NOSE KAREN" },
      { src: "/images/gallery/everyday-2.jpg", caption: "Car karaoke" },
      { src: "/images/gallery/everyday-3.jpg", caption: "Cooking chaos" },
    ],
  },
  {
    name: "Little Trips",
    photos: [
      { src: "/images/gallery/trip-1.jpg", caption: "Sunset pull-off" },
      { src: "/images/gallery/trip-2.jpg", caption: "Boardwalk fries" },
      { src: "/images/gallery/trip-3.jpg", caption: "That tiny Airbnb tree" },
    ],
  },
];

const puzzles = [
  {
    id: "memory-questions",
    type: "bundle",
    prompt: "The homepage is corrupted. Answer all four memory questions to stabilize it.",
    questions: [
      {
        key: "first-date-place",
        label:
          "In april 2025, two people found their way to their first date... Where was it?",
        answers: ["1099 University Dr #111, College Station, TX 77840"],
      },
      {
        key: "keepsake",
        label:
          "What small asian keepsake followed with esben through 5 different countries while your relationship was still growing?",
        answers: ["Junha Keam"],
      },
      {
        key: "zoo",
        label:
          "Where did Esben take you to let the animal lover side of you really shine?",
        answers: ["Fort Worth Zoo"],
      },
      {
        key: "ice-cream",
        label:
          "What was the first flavor of ice cream that you and esben made?",
        answers: ["Coffee"],
      },
    ],
    repair: "The homepage remembers what it was supposed to say.",
  },
  {
    id: "crossword",
    type: "crossword",
    prompt: "The logs and navigation are still jammed. Fill the mini crossword.",
    clues: [
      { number: "1 Across", text: "What this page is full of", answer: "LOVE" },
      { number: "1 Down", text: "Short letters and memories", answer: "LOGS" },
    ],
    repair: "The logs and navigation stop drifting and lock into place.",
  },
  {
    id: "timeline-order",
    type: "reorder",
    prompt: "The timeline got shuffled. Put these moments back in order.",
    items: [
      { id: "friends", label: "Met the friends" },
      { id: "rain", label: "Rain walk" },
      { id: "messages", label: "First messages" },
      { id: "coffee", label: "First coffee date" },
    ],
    answer: ["messages", "coffee", "rain", "friends"],
    repair: "The timeline snaps back into chronological order.",
  },
  {
    id: "site-kit",
    type: "multi",
    prompt: "The last section needs the right ingredients. Pick the three things that belong here.",
    choices: [
      "Photos",
      "Memories",
      "Timeline",
      "Quarterly report",
      "Bug backlog",
      "Expense sheet",
    ],
    answer: ["Photos", "Memories", "Timeline"],
    repair: "The gallery, about section, and final unlock come back online.",
  },
];

const PUZZLE_STORAGE_KEY = "karen-anniversary-puzzle-progress-v3";
const FINAL_MESSAGE =
  "For your final puzzle... in a whiskey's fabric den, it lays under the collaberation of two hearts recharging";

const normalizeAnswer = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, " ");

const makeAnswerState = () =>
  Object.fromEntries(
    puzzles.map((puzzle) => {
      if (puzzle.type === "bundle") {
        return [
          puzzle.id,
          Object.fromEntries(puzzle.questions.map((question) => [question.key, ""])),
        ];
      }

      if (puzzle.type === "crossword") {
        return [
          puzzle.id,
          {
            top0: "",
            top1: "",
            top2: "",
            top3: "",
            left1: "",
            left2: "",
            left3: "",
          },
        ];
      }

      if (puzzle.type === "reorder") {
        return [puzzle.id, puzzle.items.map((item) => item.id)];
      }

      if (puzzle.type === "multi") {
        return [puzzle.id, []];
      }

      return [puzzle.id, ""];
    }),
  );

const makeStatusState = () =>
  Object.fromEntries(puzzles.map((puzzle) => [puzzle.id, false]));

const readSavedPuzzleProgress = () => {
  const fallback = {
    answers: makeAnswerState(),
    statuses: makeStatusState(),
  };

  if (typeof window === "undefined") return fallback;

  try {
    const saved = window.localStorage.getItem(PUZZLE_STORAGE_KEY);

    if (!saved) return fallback;

    const parsed = JSON.parse(saved);

    return {
      answers: {
        ...fallback.answers,
        ...(parsed.answers ?? {}),
      },
      statuses: {
        ...fallback.statuses,
        ...(parsed.statuses ?? {}),
      },
    };
  } catch {
    return fallback;
  }
};

const scrambleText = (text) => {
  const letters = "#?!~%&*@";

  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return char;
      return index % 3 === 0 ? letters[index % letters.length] : char;
    })
    .join("");
};

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Section = ({ id, title, subtitle, className = "", children }) => (
  <section id={id} className={`py-12 transition-all duration-500 sm:py-16 ${className}`}>
    <Container>
      <div className="mb-8">
        <h2 className={`text-2xl font-semibold sm:text-3xl ${theme.text}`}>{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-neutral-600 sm:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </Container>
  </section>
);

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-2xl border ${theme.border} bg-white p-5 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
    {children}
  </span>
);

const PlacePhoto = ({ src, alt = "", className = "" }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      className={`h-auto max-w-full rounded-xl border ${theme.border} ${className}`}
      loading="lazy"
    />
  ) : (
    <div
      className={`grid place-items-center rounded-xl border ${theme.border} bg-neutral-100 text-neutral-400 ${className}`}
      style={{ minHeight: "150px" }}
    >
      Add Photo
    </div>
  );

const Scribble = () => (
  <svg
    aria-hidden="true"
    className="h-6 w-14"
    viewBox="0 0 72 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18C12 8 18 23 28 12C35 4 43 22 52 10C57 4 63 17 69 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 5C12 14 18 3 24 10C32 18 37 2 45 11C50 17 58 6 66 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
  </svg>
);

const FinalUnlock = ({ onOpenFinalPage }) => (
  <section className="border-b border-[#efc7d1] bg-[#fff1f5] py-5">
    <Container>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d56a87]">
            everything restored
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-900">YOU FIXED IT</h2>
        </div>
        <button
          type="button"
          onClick={onOpenFinalPage}
          className="rounded-full border-2 border-dashed border-neutral-900 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[4px_4px_0_0_rgba(34,34,34,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-1deg]"
        >
          Open final puzzle
        </button>
      </div>
    </Container>
  </section>
);

const Nav = ({ solvedCount, onOpenPuzzle, allFixed }) => (
  <header
    className={`sticky top-0 z-40 border-b border-neutral-200 backdrop-blur supports-[backdrop-filter]:bg-white/70 ${
      allFixed ? "" : "rotate-[0.2deg]"
    }`}
  >
    <Container>
      <div className="flex h-14 items-center justify-between gap-3">
        <a href="#home" className={`font-semibold tracking-tight ${allFixed ? "" : "translate-y-0.5"}`}>
          E ❤ K
        </a>
        <nav className={`hidden gap-6 text-sm sm:flex ${solvedCount >= 2 ? "" : "opacity-65"}`}>
          <a className="hover:opacity-70" href="#logs">
            {solvedCount >= 2 ? "Logs" : scrambleText("Logs")}
          </a>
          <a className="hover:opacity-70" href="#timeline">
            {solvedCount >= 3 ? "Timeline" : scrambleText("Timeline")}
          </a>
          <a className="hover:opacity-70" href="#gallery">
            {solvedCount >= 4 ? "Gallery" : scrambleText("Gallery")}
          </a>
          <a className="hover:opacity-70" href="#about">
            {solvedCount >= 4 ? "About" : scrambleText("About")}
          </a>
        </nav>
        <button
          type="button"
          onClick={onOpenPuzzle}
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:-rotate-2 hover:bg-neutral-900 hover:text-white"
        >
          Fix This
          <Scribble />
          <span className="rounded-full bg-neutral-900 px-1.5 py-0.5 text-[10px] text-white">
            {solvedCount}/{puzzles.length}
          </span>
        </button>
      </div>
    </Container>
  </header>
);

const Hero = ({ solvedCount, onOpenPuzzle }) => {
  const fixed = solvedCount >= 1;
  const allFixed = solvedCount === puzzles.length;

  return (
    <section id="home" className={`relative overflow-hidden ${theme.bg} ${theme.text}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(242,140,163,0.2),_transparent_70%)]" />
      <Container>
        <div className="grid gap-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <span className="mb-4 inline-flex max-w-max -rotate-2 rounded-full border border-dashed border-neutral-900 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 shadow-sm">
              <span className="mr-2 text-[#F28CA3]">!!!</span>
              someone broke the website
            </span>
            <h1
              className={`text-3xl font-semibold leading-tight tracking-tight transition-all duration-500 sm:text-5xl ${
                fixed ? "" : "rotate-[-3deg] translate-x-1"
              }`}
            >
              {fixed
                ? "HAPPY ONE YEAR KAREN RAHHH!!!!"
                : scrambleText("HAPPY ONE YEAR KAREN RAHHH!!!!")}
            </h1>
            <p className={`mt-3 sm:text-lg ${fixed ? "text-neutral-700" : "text-neutral-400 line-through"}`}>
              {fixed ? "2025-06-12 → [literawy foreva]" : "20??-0?-1? → [????????????]"}
            </p>
            <p
              className={`mt-6 max-w-prose transition-all duration-500 ${
                fixed ? "text-neutral-700" : "rotate-[1.5deg] blur-[3px] text-neutral-500"
              }`}
            >
              {fixed
                ? "Karen, this little corner of the internet was supposed to feel neat and complete, but apparently it needed your help first. Fix the rest and then follow it all the way through."
                : scrambleText(
                    "Karen, this little corner of the internet is broken in a very suspiciously dramatic way. Fix it."
                  )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenPuzzle}
                className="group inline-flex items-center gap-3 rounded-[1.75rem] border-2 border-dashed border-neutral-900 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[4px_4px_0_0_rgba(34,34,34,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-1deg]"
              >
                <span className="leading-none">click the scribble to fix me</span>
                <span className="text-[#F28CA3] transition group-hover:rotate-6">
                  <Scribble />
                </span>
              </button>
              <a
                href="#gallery"
                className={`rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition ${
                  allFixed ? "opacity-100" : "pointer-events-none -rotate-2 opacity-30"
                }`}
              >
                Open gallery
              </a>
            </div>
          </div>
          <div
            className={`order-1 transition-all duration-700 lg:order-2 ${
              fixed ? "" : "rotate-[6deg] translate-y-4 saturate-50"
            }`}
          >
            <PlacePhoto
              src="/images/cover.jpeg"
              alt="My favorite photo of us"
              className={fixed ? "" : "border-dashed"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

const BundlePuzzle = ({ puzzle, value, onChange, onSubmit, solved }) => (
  <div className="mt-4 space-y-4">
    {puzzle.questions.map((question, index) => (
      <div key={question.key}>
        <label className="block text-sm font-medium leading-6 text-neutral-800">
          {index + 1}. {question.label}
        </label>
        <input
          type="text"
          value={value[question.key] ?? ""}
          onChange={(event) => onChange(puzzle.id, question.key, event.target.value)}
          className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
          disabled={solved}
        />
      </div>
    ))}
    <button
      type="button"
      onClick={() => onSubmit(puzzle.id)}
      disabled={solved}
      className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
    >
      {solved ? "Solved" : "Repair"}
    </button>
  </div>
);

const CrosswordCell = ({ value, onChange, className = "", label, disabled }) => (
  <input
    aria-label={label}
    maxLength={1}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`h-11 w-11 rounded-xl border border-neutral-300 bg-white text-center text-lg font-semibold uppercase text-neutral-900 outline-none transition focus:border-neutral-900 ${className}`}
  />
);

const CrosswordPuzzle = ({ value, onChange, onSubmit, solved, puzzle }) => (
  <div className="mt-4">
    <div className="grid gap-6 lg:grid-cols-[auto,1fr]">
      <div className="relative grid w-max grid-cols-4 gap-2 rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
        <span className="absolute left-6 top-5 text-[10px] font-semibold text-neutral-400">1</span>
        <CrosswordCell
          value={value.top0}
          onChange={(event) => onChange(puzzle.id, "top0", event.target.value)}
          label="Crossword shared cell"
          disabled={solved}
          className="pl-3"
        />
        <CrosswordCell
          value={value.top1}
          onChange={(event) => onChange(puzzle.id, "top1", event.target.value)}
          label="Crossword top row cell 2"
          disabled={solved}
        />
        <CrosswordCell
          value={value.top2}
          onChange={(event) => onChange(puzzle.id, "top2", event.target.value)}
          label="Crossword top row cell 3"
          disabled={solved}
        />
        <CrosswordCell
          value={value.top3}
          onChange={(event) => onChange(puzzle.id, "top3", event.target.value)}
          label="Crossword top row cell 4"
          disabled={solved}
        />
        <CrosswordCell
          value={value.left1}
          onChange={(event) => onChange(puzzle.id, "left1", event.target.value)}
          label="Crossword left column cell 2"
          disabled={solved}
        />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <CrosswordCell
          value={value.left2}
          onChange={(event) => onChange(puzzle.id, "left2", event.target.value)}
          label="Crossword left column cell 3"
          disabled={solved}
        />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <CrosswordCell
          value={value.left3}
          onChange={(event) => onChange(puzzle.id, "left3", event.target.value)}
          label="Crossword left column cell 4"
          disabled={solved}
        />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
        <div className="h-11 w-11 rounded-xl bg-neutral-200/70" />
      </div>
      <div className="space-y-3 text-sm text-neutral-700">
        {puzzle.clues.map((clue) => (
          <div key={clue.number} className="rounded-2xl border border-neutral-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              {clue.number}
            </p>
            <p className="mt-2">{clue.text}</p>
          </div>
        ))}
      </div>
    </div>
    <button
      type="button"
      onClick={() => onSubmit(puzzle.id)}
      disabled={solved}
      className="mt-4 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
    >
      {solved ? "Solved" : "Check crossword"}
    </button>
  </div>
);

const ReorderPuzzle = ({ puzzle, value, onMove, onSubmit, solved }) => (
  <div className="mt-4 space-y-3">
    {value.map((itemId, index) => {
      const item = puzzle.items.find((entry) => entry.id === itemId);

      return (
        <div
          key={itemId}
          className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              slot {index + 1}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-900">{item.label}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onMove(puzzle.id, index, -1)}
              disabled={solved || index === 0}
              className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300 text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-35"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => onMove(puzzle.id, index, 1)}
              disabled={solved || index === value.length - 1}
              className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300 text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-35"
            >
              ↓
            </button>
          </div>
        </div>
      );
    })}
    <button
      type="button"
      onClick={() => onSubmit(puzzle.id)}
      disabled={solved}
      className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
    >
      {solved ? "Solved" : "Lock order"}
    </button>
  </div>
);

const MultiPuzzle = ({ puzzle, value, onToggle, onSubmit, solved }) => (
  <div className="mt-4 space-y-3">
    <div className="grid gap-3 sm:grid-cols-2">
      {puzzle.choices.map((choice) => {
        const active = value.includes(choice);

        return (
          <button
            key={choice}
            type="button"
            onClick={() => onToggle(puzzle.id, choice)}
            disabled={solved}
            className={`rounded-2xl border p-4 text-left text-sm font-medium transition ${
              active
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-800 hover:-translate-y-0.5"
            } ${solved ? "cursor-default" : ""}`}
          >
            {choice}
          </button>
        );
      })}
    </div>
    <button
      type="button"
      onClick={() => onSubmit(puzzle.id)}
      disabled={solved}
      className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
    >
      {solved ? "Solved" : "Repair"}
    </button>
  </div>
);

const PuzzlePanel = ({
  isOpen,
  solvedCount,
  answers,
  statuses,
  onBundleChange,
  onBundleSubmit,
  onCrosswordChange,
  onCrosswordSubmit,
  onReorderMove,
  onReorderSubmit,
  onMultiToggle,
  onMultiSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/45 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mx-auto max-w-3xl">
        <Card
          className="border-neutral-900 bg-[#fffdf8] shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F28CA3]">
                repair protocol
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Karen has to fix the page
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 sm:text-base">
                The first repair is the question bundle. After that, three separate broken areas
                each need a different kind of fix.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100"
              >
                Back to site
              </button>
              <button
                type="button"
                aria-label="Close puzzle panel"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300 text-lg leading-none text-neutral-700 transition hover:bg-neutral-100"
              >
                ×
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-600">
            <div className="h-2 flex-1 rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-[#F28CA3] transition-all duration-500"
                style={{ width: `${(solvedCount / puzzles.length) * 100}%` }}
              />
            </div>
            <span>
              {solvedCount}/{puzzles.length} fixed
            </span>
          </div>

          <div className="mt-8 grid gap-5">
            {puzzles.map((puzzle, index) => {
              const solved = statuses[puzzle.id];
              const unlocked = index === 0 || statuses[puzzles[index - 1].id];

              return (
                <div
                  key={puzzle.id}
                  className={`rounded-2xl border p-4 transition ${
                    solved
                      ? "border-emerald-300 bg-emerald-50/60"
                      : unlocked
                        ? "border-neutral-200 bg-white"
                        : "border-neutral-200 bg-neutral-100/80 opacity-60"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                        puzzle {index + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                        {unlocked ? puzzle.prompt : "Locked until the repair above is finished."}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                        solved
                          ? "bg-emerald-600 text-white"
                          : unlocked
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-300 text-neutral-600"
                      }`}
                    >
                      {solved ? "fixed" : unlocked ? "active" : "locked"}
                    </span>
                  </div>

                  {unlocked && puzzle.type === "bundle" ? (
                    <BundlePuzzle
                      puzzle={puzzle}
                      value={answers[puzzle.id]}
                      onChange={onBundleChange}
                      onSubmit={onBundleSubmit}
                      solved={solved}
                    />
                  ) : null}

                  {unlocked && puzzle.type === "crossword" ? (
                    <CrosswordPuzzle
                      puzzle={puzzle}
                      value={answers[puzzle.id]}
                      onChange={onCrosswordChange}
                      onSubmit={onCrosswordSubmit}
                      solved={solved}
                    />
                  ) : null}

                  {unlocked && puzzle.type === "reorder" ? (
                    <ReorderPuzzle
                      puzzle={puzzle}
                      value={answers[puzzle.id]}
                      onMove={onReorderMove}
                      onSubmit={onReorderSubmit}
                      solved={solved}
                    />
                  ) : null}

                  {unlocked && puzzle.type === "multi" ? (
                    <MultiPuzzle
                      puzzle={puzzle}
                      value={answers[puzzle.id]}
                      onToggle={onMultiToggle}
                      onSubmit={onMultiSubmit}
                      solved={solved}
                    />
                  ) : null}

                  <p className={`mt-3 text-sm ${solved ? "text-emerald-700" : "text-neutral-500"}`}>
                    {solved ? puzzle.repair : unlocked ? "Still broken." : "Finish the previous repair first."}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

const LogsIndex = ({ solvedCount }) => {
  const fixed = solvedCount >= 2;

  return (
    <Section
      id="logs"
      title={fixed ? "Logs" : scrambleText("Logs")}
      subtitle={fixed ? "Short letters and memories." : scrambleText("These memories are still drifting around.")}
      className={fixed ? "" : "rotate-[1deg]"}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Tag>{fixed ? "firsts" : "???"}</Tag>
        <Tag>{fixed ? "everyday" : "???"}</Tag>
        <Tag>{fixed ? "trip" : "???"}</Tag>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {logs.map((log, index) => (
          <Card
            key={log.slug}
            className={`transition-all duration-700 ${
              fixed
                ? ""
                : index % 2 === 0
                  ? "-rotate-3 translate-y-4 blur-[1px]"
                  : "rotate-3 -translate-y-2 blur-[1px]"
            }`}
          >
            <div className="grid gap-3">
              <PlacePhoto src={log.heroImage} alt={log.title} className={fixed ? "" : "border-dashed"} />
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>{fixed ? log.date : "20??-??-??"}</span>
                <span>{fixed ? log.location : scrambleText(log.location)}</span>
              </div>
              <h3 className="text-lg font-semibold">{fixed ? log.title : scrambleText(log.title)}</h3>
              <p className="text-sm text-neutral-700">{fixed ? log.excerpt : scrambleText(log.excerpt)}</p>
              <div className="flex gap-2">
                {log.tags.map((tag) => (
                  <Tag key={tag}>{fixed ? tag : "???"}</Tag>
                ))}
              </div>
              <details className="group mt-2">
                <summary className="cursor-pointer select-none text-sm underline decoration-neutral-300 hover:decoration-neutral-700">
                  {fixed ? "Open log" : scrambleText("Open log")}
                </summary>
                <div className="mt-3 space-y-3">
                  {log.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-sm leading-relaxed text-neutral-800">
                      {fixed ? paragraph : scrambleText(paragraph)}
                    </p>
                  ))}
                </div>
              </details>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const Timeline = ({ solvedCount }) => {
  const fixed = solvedCount >= 3;

  return (
    <Section
      id="timeline"
      title={fixed ? "Timeline" : scrambleText("Timeline")}
      subtitle={fixed ? "A few milestones so far." : scrambleText("The dates are still resisting repair.")}
      className={fixed ? "" : "opacity-80"}
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-neutral-200 sm:left-1/2" />
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={item.id} className="relative sm:grid sm:grid-cols-2 sm:gap-8">
              <div className="absolute left-4 mt-2 h-3.5 w-3.5 -ml-[7px] rounded-full bg-black sm:left-1/2" />
              <div
                className={`transition-all duration-700 sm:col-span-1 ${
                  index % 2 === 0 ? "sm:pr-12" : "sm:order-2 sm:pl-12"
                } ${
                  fixed
                    ? ""
                    : index % 2 === 0
                      ? "sm:-translate-x-6 rotate-[-4deg]"
                      : "sm:translate-x-6 rotate-[4deg]"
                }`}
              >
                <Card className={fixed ? "" : "border-dashed"}>
                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <span>{fixed ? item.date : "20??-??-??"}</span>
                    <span>{fixed ? item.title : scrambleText(item.title)}</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-800">
                    {fixed ? item.blurb : scrambleText(item.blurb)}
                  </p>
                  <div className="mt-3">
                    <PlacePhoto
                      src={item.photo}
                      alt={item.title}
                      className={fixed ? "" : "grayscale contrast-75"}
                    />
                  </div>
                </Card>
              </div>
              <div className={index % 2 === 0 ? "sm:order-2" : ""} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Gallery = ({ solvedCount }) => {
  const fixed = solvedCount >= 4;

  return (
    <Section
      id="gallery"
      title={fixed ? "Gallery" : scrambleText("Gallery")}
      subtitle={fixed ? "The good stuff is back." : scrambleText("The pictures are still sulking.")}
      className={fixed ? "" : "opacity-65"}
    >
      <div className="space-y-8">
        {albums.map((album) => (
          <div key={album.name}>
            <h3 className="mb-3 text-lg font-semibold">{fixed ? album.name : scrambleText(album.name)}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {album.photos.map((photo, index) => (
                <figure
                  key={index}
                  className={fixed ? "" : "odd:translate-y-4 odd:rotate-2 even:-translate-y-3 even:-rotate-2"}
                >
                  <PlacePhoto
                    src={photo.src}
                    alt={photo.caption}
                    className={fixed ? "" : "sepia saturate-50 border-dashed"}
                  />
                  <figcaption className="mt-1 text-xs text-neutral-500">
                    {fixed ? photo.caption : "???"}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const About = ({ solvedCount }) => {
  const fixed = solvedCount >= 4;

  return (
    <Section
      id="about"
      title={fixed ? "About us" : scrambleText("About us")}
      subtitle={fixed ? "A little overview." : scrambleText("Final note still encrypted.")}
    >
      <Card className={fixed ? "" : "rotate-[1deg] border-dashed"}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            {fixed ? (
              <p className="text-neutral-800">
                We started this story in spring 2025 with tacos and a 4-message interaction on
                hinge, and you have grown to be my favorite person ever. When we started dating, we
                only had a few weeks together before I went and spent a month in Asia away from
                you, which was a very stupid decision in one sense and a clarifying one in another
                because all I wanted was to get back to you. Coming back to you was amazing, and
                every moment I have had with you since has felt like proof that what I found in you
                is not just a girlfriend, but a best friend, a partner in crime, and my favorite
                person to keep building a life with. I love you and I cannot wait for year two.
              </p>
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm leading-7 text-neutral-500">
                <p>{scrambleText("Final letter corrupted.")}</p>
                <p className="mt-2">
                  {scrambleText("Solve the last puzzle to get the real version.")}
                </p>
              </div>
            )}
          </div>
          <div>
            <PlacePhoto
              src="/images/abtus.jpeg"
              alt="Photo strip"
              className={fixed ? "" : "rotate-3 grayscale border-dashed"}
            />
          </div>
        </div>
      </Card>
    </Section>
  );
};

const Footer = ({ solvedCount }) => (
  <footer
    className={`border-t border-neutral-200 py-10 text-center text-sm ${
      solvedCount === puzzles.length ? "text-neutral-500" : "text-neutral-400"
    }`}
  >
    <Container>
      <p>
        © {new Date().getFullYear()} Esben + Karen ·{" "}
        {solvedCount === puzzles.length ? "Built with love" : scrambleText("under emergency repair")}
      </p>
    </Container>
  </footer>
);

const FinalPage = ({ onBack }) => (
  <div className="min-h-screen bg-[#fff8fb] px-4 py-16 text-neutral-900">
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
      >
        Back to the site
      </button>
      <div className="rounded-[2rem] border-2 border-dashed border-neutral-900 bg-white p-8 shadow-[8px_8px_0_0_rgba(34,34,34,0.08)] sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d56a87]">
          final puzzle
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
          For your final puzzle...
        </h1>
        <p className="mt-6 text-lg leading-8 sm:text-2xl sm:leading-10">{FINAL_MESSAGE}</p>
      </div>
    </div>
  </div>
);

export default function AnniversarySite() {
  const initialState = readSavedPuzzleProgress();
  const [view, setView] = useState("site");
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [answers, setAnswers] = useState(initialState.answers);
  const [statuses, setStatuses] = useState(initialState.statuses);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onClick = (event) => {
      const anchor = event.target.closest("a[href^='#']");

      if (!anchor) return;

      const id = anchor.getAttribute("href").slice(1);
      const element = document.getElementById(id);

      if (element) {
        event.preventDefault();
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      PUZZLE_STORAGE_KEY,
      JSON.stringify({
        answers,
        statuses,
      }),
    );
  }, [answers, statuses]);

  useEffect(() => {
    if (!isPuzzleOpen || typeof window === "undefined") return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPuzzleOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPuzzleOpen]);

  const solvedCount = Object.values(statuses).filter(Boolean).length;
  const allFixed = solvedCount === puzzles.length;

  const markSolved = (id) => {
    setStatuses((current) => ({
      ...current,
      [id]: true,
    }));
  };

  const handleBundleChange = (id, key, value) => {
    setAnswers((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [key]: value,
      },
    }));
  };

  const handleBundleSubmit = (id) => {
    const puzzle = puzzles.find((entry) => entry.id === id);

    if (!puzzle || puzzle.type !== "bundle") return;

    const isCorrect = puzzle.questions.every((question) => {
      const currentValue = answers[id][question.key] ?? "";

      return question.answers.some(
        (answer) => normalizeAnswer(answer) === normalizeAnswer(currentValue),
      );
    });

    if (isCorrect) markSolved(id);
  };

  const handleCrosswordChange = (id, cell, value) => {
    setAnswers((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [cell]: value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 1),
      },
    }));
  };

  const handleCrosswordSubmit = (id) => {
    const current = answers[id];
    const across = `${current.top0}${current.top1}${current.top2}${current.top3}`;
    const down = `${current.top0}${current.left1}${current.left2}${current.left3}`;

    if (across === "LOVE" && down === "LOGS") {
      markSolved(id);
    }
  };

  const handleReorderMove = (id, index, direction) => {
    setAnswers((current) => {
      const next = [...current[id]];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= next.length) return current;

      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];

      return {
        ...current,
        [id]: next,
      };
    });
  };

  const handleReorderSubmit = (id) => {
    const puzzle = puzzles.find((entry) => entry.id === id);

    if (!puzzle || puzzle.type !== "reorder") return;

    const isCorrect = puzzle.answer.every((itemId, index) => answers[id][index] === itemId);

    if (isCorrect) markSolved(id);
  };

  const handleMultiToggle = (id, choice) => {
    setAnswers((current) => {
      const selected = current[id];
      const nextSelected = selected.includes(choice)
        ? selected.filter((entry) => entry !== choice)
        : [...selected, choice];

      return {
        ...current,
        [id]: nextSelected,
      };
    });
  };

  const handleMultiSubmit = (id) => {
    const puzzle = puzzles.find((entry) => entry.id === id);

    if (!puzzle || puzzle.type !== "multi") return;

    const selected = answers[id];
    const isCorrect =
      selected.length === puzzle.answer.length &&
      puzzle.answer.every((choice) => selected.includes(choice));

    if (isCorrect) markSolved(id);
  };

  if (view === "final") {
    return <FinalPage onBack={() => setView("site")} />;
  }

  return (
    <div className={`${theme.bg} min-h-screen ${theme.text}`}>
      <PuzzlePanel
        isOpen={isPuzzleOpen}
        solvedCount={solvedCount}
        answers={answers}
        statuses={statuses}
        onBundleChange={handleBundleChange}
        onBundleSubmit={handleBundleSubmit}
        onCrosswordChange={handleCrosswordChange}
        onCrosswordSubmit={handleCrosswordSubmit}
        onReorderMove={handleReorderMove}
        onReorderSubmit={handleReorderSubmit}
        onMultiToggle={handleMultiToggle}
        onMultiSubmit={handleMultiSubmit}
        onClose={() => setIsPuzzleOpen(false)}
      />
      {allFixed ? <FinalUnlock onOpenFinalPage={() => setView("final")} /> : null}
      <Nav solvedCount={solvedCount} onOpenPuzzle={() => setIsPuzzleOpen(true)} allFixed={allFixed} />
      <Hero solvedCount={solvedCount} onOpenPuzzle={() => setIsPuzzleOpen(true)} />
      <LogsIndex solvedCount={solvedCount} />
      <Timeline solvedCount={solvedCount} />
      <Gallery solvedCount={solvedCount} />
      <About solvedCount={solvedCount} />
      <Footer solvedCount={solvedCount} />
    </div>
  );
}
