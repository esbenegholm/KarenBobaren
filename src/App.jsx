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

const timelineEntries = [
  {
    id: "display-velvet-taco",
    title: "Velvet Taco",
    detail: "The opening chapter.",
  },
  {
    id: "display-asia",
    title: "ESBEN LEFT FOR ASIA",
    detail: "The dramatic long-distance stretch.",
  },
  {
    id: "display-return",
    title: "ESBEN IS BACK",
    detail: "Back where he belonged.",
  },
  {
    id: "display-uno-ano",
    title: "THE BIG UNO ANO",
    detail: "The whole reason this site exists.",
  },
];

const timelinePuzzleMoments = [
  "Velvet Taco",
  "Top Golf",
  "Roadhouse Delivery",
  "ESBEN LEFT FOR ASIA",
  "ESBEN IS BACK",
  "Esben moves to dallas",
  "Vegas Trip",
  "White Linen",
  "First Aggie Football Game Together",
  "Oktoberfest",
  "Halloween",
  "Office Christmas Party",
  "Shootin Shotguns",
  "VALENTINES DAY GURL",
  "big zoo time",
  "Getaway to oklahoma cabin",
  "Johans grad party",
  "THE BIG UNO ANO",
].map((title, index) => ({
  id: `timeline-puzzle-${index + 1}`,
  title,
}));

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
    prompt: "The logs and navigation are still jammed. Fill the crossword clues.",
    clues: [
      { key: "asia", number: 1, direction: "across", row: 0, col: 5, text: "esben went here before we became official", answer: "ASIA" },
      { key: "jetski", number: 2, direction: "down", row: 0, col: 1, text: "what did we use on our water based adventure", answer: "JETSKI" },
      { key: "anniversary", number: 3, direction: "down", row: 0, col: 5, text: "happy ______", answer: "ANNIVERSARY" },
      { key: "lebron", number: 4, direction: "across", row: 1, col: 0, text: "the goat", answer: "LEBRON" },
      { key: "karen", number: 5, direction: "down", row: 2, col: 8, text: "which one is so beautiful", answer: "KAREN" },
      { key: "chipsandqueso", number: 6, direction: "across", row: 3, col: 3, text: "the first thing we ate together", answer: "CHIPSANDQUESO" },
      { key: "esben", number: 7, direction: "down", row: 3, col: 13, text: "which one is so handome", answer: "ESBEN" },
      { key: "perfect", number: 8, direction: "across", row: 5, col: 4, text: "what type of match are we", answer: "PERFECT" },
      { key: "bale", number: 9, direction: "across", row: 5, col: 13, text: "best pho of all time", answer: "BALE" },
      { key: "dallas", number: 10, direction: "across", row: 8, col: 4, text: "where did we tour apartments", answer: "DALLAS" },
      { key: "love", number: 11, direction: "down", row: 8, col: 7, text: "what are we in", answer: "LOVE" },
    ],
    repair: "The logs and navigation stop drifting and lock into place.",
  },
  {
    id: "timeline-order",
    type: "reorder",
    prompt: "The timeline got shuffled. Put these moments back in order.",
    items: [
      { id: "timeline-puzzle-8", label: "White Linen" },
      { id: "timeline-puzzle-12", label: "Office Christmas Party" },
      { id: "timeline-puzzle-2", label: "Top Golf" },
      { id: "timeline-puzzle-17", label: "Johans grad party" },
      { id: "timeline-puzzle-5", label: "ESBEN IS BACK" },
      { id: "timeline-puzzle-10", label: "Oktoberfest" },
      { id: "timeline-puzzle-14", label: "VALENTINES DAY GURL" },
      { id: "timeline-puzzle-1", label: "Velvet Taco" },
      { id: "timeline-puzzle-9", label: "First Aggie Football Game Together" },
      { id: "timeline-puzzle-16", label: "Getaway to oklahoma cabin" },
      { id: "timeline-puzzle-6", label: "Esben moves to dallas" },
      { id: "timeline-puzzle-3", label: "Roadhouse Delivery" },
      { id: "timeline-puzzle-18", label: "THE BIG UNO ANO" },
      { id: "timeline-puzzle-13", label: "Shootin Shotguns" },
      { id: "timeline-puzzle-11", label: "Halloween" },
      { id: "timeline-puzzle-7", label: "Vegas Trip" },
      { id: "timeline-puzzle-15", label: "big zoo time" },
      { id: "timeline-puzzle-4", label: "ESBEN LEFT FOR ASIA" },
    ],
    answer: timelinePuzzleMoments.map((item) => item.id),
    repair: "The timeline snaps back into chronological order.",
  },
  {
    id: "site-kit",
    type: "wordle",
    prompt: "The last section needs one final word. Solve the Wordle.",
    answer: "LOVES",
    repair: "The gallery, about section, and final unlock come back online.",
  },
];

const PUZZLE_STORAGE_KEY = "karen-anniversary-puzzle-progress-v3";
const FINAL_MESSAGE =
  "For your final puzzle... in a whiskey's fabric den, it lays under the collaberation of two hearts recharging";

const normalizeAnswer = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, " ");

const getCrosswordCells = (clues) => {
  const cells = {};

  clues.forEach((clue) => {
    clue.answer.split("").forEach((_, index) => {
      const row = clue.row + (clue.direction === "down" ? index : 0);
      const col = clue.col + (clue.direction === "across" ? index : 0);
      const key = `${row}-${col}`;

      if (!cells[key]) {
        cells[key] = { row, col, starts: [] };
      }

      if (index === 0) {
        cells[key].starts.push(clue.number);
      }
    });
  });

  return cells;
};

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
          Object.fromEntries(
            Object.keys(getCrosswordCells(puzzle.clues)).map((cellKey) => [cellKey, ""]),
          ),
        ];
      }

      if (puzzle.type === "reorder") {
        return [puzzle.id, puzzle.items.map((item) => item.id)];
      }

      if (puzzle.type === "wordle") {
        return [
          puzzle.id,
          {
            currentGuess: "",
            guesses: [],
          },
        ];
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
    const safeAnswers = { ...fallback.answers };
    const safeStatuses = { ...fallback.statuses };

    puzzles.forEach((puzzle) => {
      const savedAnswer = parsed.answers?.[puzzle.id];
      const savedStatus = parsed.statuses?.[puzzle.id];

      if (typeof savedStatus === "boolean") {
        safeStatuses[puzzle.id] = savedStatus;
      }

      if (puzzle.type === "bundle" && savedAnswer && typeof savedAnswer === "object") {
        safeAnswers[puzzle.id] = {
          ...fallback.answers[puzzle.id],
          ...savedAnswer,
        };
      }

      if (puzzle.type === "crossword" && savedAnswer && typeof savedAnswer === "object") {
        safeAnswers[puzzle.id] = {
          ...fallback.answers[puzzle.id],
          ...savedAnswer,
        };
      }

      if (puzzle.type === "reorder" && Array.isArray(savedAnswer)) {
        const validIds = new Set(puzzle.items.map((item) => item.id));
        const sameIds =
          savedAnswer.length === puzzle.items.length &&
          savedAnswer.every((itemId) => validIds.has(itemId));

        safeAnswers[puzzle.id] = sameIds ? savedAnswer : fallback.answers[puzzle.id];
      }

      if (
        puzzle.type === "wordle" &&
        savedAnswer &&
        typeof savedAnswer === "object" &&
        Array.isArray(savedAnswer.guesses) &&
        typeof savedAnswer.currentGuess === "string"
      ) {
        safeAnswers[puzzle.id] = {
          currentGuess: savedAnswer.currentGuess.slice(0, 5).toUpperCase(),
          guesses: savedAnswer.guesses
            .filter((guess) => typeof guess === "string")
            .map((guess) => guess.slice(0, 5).toUpperCase())
            .slice(0, 6),
        };
      }
    });

    return {
      answers: safeAnswers,
      statuses: safeStatuses,
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

const CrosswordPuzzle = ({ value, onChange, onSubmit, solved, puzzle }) => {
  const cells = getCrosswordCells(puzzle.clues);
  const maxRow = Math.max(...Object.values(cells).map((cell) => cell.row));
  const maxCol = Math.max(...Object.values(cells).map((cell) => cell.col));
  const acrossClues = puzzle.clues.filter((clue) => clue.direction === "across");
  const downClues = puzzle.clues.filter((clue) => clue.direction === "down");

  return (
    <div className="mt-4 space-y-4">
      <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${maxCol + 1}, minmax(0, 2.25rem))` }}
        >
          {Array.from({ length: (maxRow + 1) * (maxCol + 1) }, (_, index) => {
            const row = Math.floor(index / (maxCol + 1));
            const col = index % (maxCol + 1);
            const key = `${row}-${col}`;
            const cell = cells[key];

            if (!cell) {
              return <div key={key} className="h-9 w-9 rounded-lg bg-neutral-200/70" />;
            }

            return (
              <div key={key} className="relative">
                {cell.starts.length ? (
                  <span className="pointer-events-none absolute left-1 top-0.5 text-[9px] font-semibold text-neutral-400">
                    {cell.starts[0]}
                  </span>
                ) : null}
                <input
                  maxLength={1}
                  value={value[key] ?? ""}
                  onChange={(event) => onChange(puzzle.id, key, event.target.value)}
                  disabled={solved}
                  className="h-9 w-9 rounded-lg border border-neutral-300 bg-white pl-3 text-center text-sm font-semibold uppercase text-neutral-900 outline-none transition focus:border-neutral-900"
                  aria-label={`Crossword row ${row + 1} col ${col + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Across
          </p>
          {acrossClues.map((clue) => (
            <div key={clue.key} className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
              <span className="font-semibold text-neutral-900">{clue.number} across:</span> {clue.text}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Down
          </p>
          {downClues.map((clue) => (
            <div key={clue.key} className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
              <span className="font-semibold text-neutral-900">{clue.number} down:</span> {clue.text}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSubmit(puzzle.id)}
        disabled={solved}
        className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
      >
        {solved ? "Solved" : "Check crossword"}
      </button>
    </div>
  );
};

const ReorderPuzzle = ({ puzzle, value, onDropItem, onSubmit, onHint, hintActive, solved }) => (
  <div className="mt-4 space-y-3">
    {value.map((itemId, index) => {
      const item = puzzle.items.find((entry) => entry.id === itemId);
      const isCorrect = puzzle.answer[index] === itemId;

      if (!item) {
        return null;
      }

      return (
        <div
          key={itemId}
          draggable={!solved}
          onDragStart={(event) => {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", itemId);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
          }}
          onDrop={(event) => {
            event.preventDefault();
            const draggedItemId = event.dataTransfer.getData("text/plain");
            onDropItem(puzzle.id, draggedItemId, index);
          }}
          className={`flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 transition ${
            hintActive
              ? isCorrect
                ? "border-emerald-400 bg-emerald-50"
                : "border-rose-400 bg-rose-50"
              : "border-neutral-200"
          }`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              slot {index + 1}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-900">{item.label}</p>
          </div>
          <div className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            drag
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
    {!solved ? (
      <button
        type="button"
        onClick={() => onHint(puzzle.id)}
        className="ml-3 rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
      >
        Hint
      </button>
    ) : null}
  </div>
);

const getWordleLetterState = (guess, answer) => {
  const result = Array(guess.length).fill("absent");
  const remaining = answer.split("");

  guess.split("").forEach((letter, index) => {
    if (answer[index] === letter) {
      result[index] = "correct";
      remaining[index] = null;
    }
  });

  guess.split("").forEach((letter, index) => {
    if (result[index] === "correct") return;
    const remainingIndex = remaining.indexOf(letter);
    if (remainingIndex !== -1) {
      result[index] = "present";
      remaining[remainingIndex] = null;
    }
  });

  return result;
};

const WordlePuzzle = ({ puzzle, value, onChange, onSubmit, solved }) => {
  const rows = Array.from({ length: 6 }, (_, index) => {
    if (index < value.guesses.length) return value.guesses[index];
    if (index === value.guesses.length) return value.currentGuess;
    return "";
  });

  return (
    <div className="mt-4 space-y-4">
      <div className="space-y-2">
        {rows.map((row, rowIndex) => {
          const states =
            row.length === 5 && rowIndex < value.guesses.length
              ? getWordleLetterState(row, puzzle.answer)
              : Array(5).fill("empty");

          return (
            <div key={rowIndex} className="flex gap-2">
              {Array.from({ length: 5 }, (_, colIndex) => {
                const letter = row[colIndex] ?? "";
                const state = states[colIndex];
                const stateClass =
                  state === "correct"
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : state === "present"
                      ? "border-amber-400 bg-amber-400 text-white"
                      : state === "absent"
                        ? "border-neutral-400 bg-neutral-400 text-white"
                        : "border-neutral-300 bg-white text-neutral-900";

                return (
                  <div
                    key={colIndex}
                    className={`grid h-12 w-12 place-items-center rounded-xl border text-lg font-semibold uppercase ${stateClass}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <input
        value={value.currentGuess}
        onChange={(event) => onChange(puzzle.id, event.target.value)}
        disabled={solved || value.guesses.length >= 6}
        maxLength={5}
        className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-center text-lg font-semibold uppercase tracking-[0.3em] text-neutral-900 outline-none transition focus:border-neutral-900"
        placeholder="_____"
      />
      <button
        type="button"
        onClick={() => onSubmit(puzzle.id)}
        disabled={solved || value.guesses.length >= 6}
        className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
      >
        {solved ? "Solved" : value.guesses.length >= 6 ? "No attempts left" : "Guess"}
      </button>
    </div>
  );
};

const PuzzlePanel = ({
  isOpen,
  solvedCount,
  answers,
  statuses,
  onBundleChange,
  onBundleSubmit,
  onCrosswordChange,
  onCrosswordSubmit,
  onReorderDrop,
  onReorderSubmit,
  onReorderHint,
  reorderHintActive,
  onWordleChange,
  onWordleSubmit,
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
                      onDropItem={onReorderDrop}
                      onSubmit={onReorderSubmit}
                      onHint={onReorderHint}
                      hintActive={reorderHintActive}
                      solved={solved}
                    />
                  ) : null}

                  {unlocked && puzzle.type === "wordle" ? (
                    <WordlePuzzle
                      puzzle={puzzle}
                      value={answers[puzzle.id]}
                      onChange={onWordleChange}
                      onSubmit={onWordleSubmit}
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
          {timelineEntries.map((item, index) => (
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
                    <span>memory {index + 1}</span>
                    <span>{fixed ? item.title : scrambleText(item.title)}</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-800">
                    {fixed
                      ? `Part ${index + 1} of the year.`
                      : scrambleText(`Part ${index + 1} of the year.`)}
                  </p>
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

const ResetProgressButton = ({ onReset }) => (
  <button
    type="button"
    onClick={onReset}
    className="fixed bottom-4 right-4 z-40 rounded-full border border-neutral-300 bg-white/90 px-3 py-1.5 text-xs text-neutral-500 shadow-sm backdrop-blur transition hover:border-neutral-500 hover:text-neutral-800"
  >
    reset progress
  </button>
);

export default function AnniversarySite() {
  const initialState = readSavedPuzzleProgress();
  const [view, setView] = useState("site");
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [answers, setAnswers] = useState(initialState.answers);
  const [statuses, setStatuses] = useState(initialState.statuses);
  const [reorderHintActive, setReorderHintActive] = useState(false);

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
    const puzzle = puzzles.find((entry) => entry.id === id);

    if (!puzzle || puzzle.type !== "crossword") return;

    const isCorrect = puzzle.clues.every(
      (clue) =>
        clue.answer.split("").every((letter, index) => {
          const row = clue.row + (clue.direction === "down" ? index : 0);
          const col = clue.col + (clue.direction === "across" ? index : 0);
          const key = `${row}-${col}`;

          return (answers[id][key] ?? "").toUpperCase() === letter;
        }),
    );

    if (isCorrect) {
      markSolved(id);
    }
  };

  const handleReorderDrop = (id, draggedItemId, targetIndex) => {
    setAnswers((current) => {
      const next = [...current[id]];
      const draggedIndex = next.indexOf(draggedItemId);

      if (draggedIndex === -1 || draggedIndex === targetIndex) return current;

      const [draggedItem] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, draggedItem);

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

  const handleReorderHint = () => {
    setReorderHintActive(true);
    window.setTimeout(() => {
      setReorderHintActive(false);
    }, 3000);
  };

  const handleWordleChange = (id, value) => {
    setAnswers((current) => {
      return {
        ...current,
        [id]: {
          ...current[id],
          currentGuess: value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5),
        },
      };
    });
  };

  const handleWordleSubmit = (id) => {
    const puzzle = puzzles.find((entry) => entry.id === id);

    if (!puzzle || puzzle.type !== "wordle") return;

    const currentGuess = answers[id].currentGuess;

    if (currentGuess.length !== 5 || answers[id].guesses.length >= 6) return;

    const nextGuesses = [...answers[id].guesses, currentGuess];

    setAnswers((current) => ({
      ...current,
      [id]: {
        currentGuess: "",
        guesses: nextGuesses,
      },
    }));

    if (currentGuess === puzzle.answer) {
      markSolved(id);
    }
  };

  const handleResetProgress = () => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Reset all puzzle progress?");

      if (!confirmed) return;

      window.localStorage.removeItem(PUZZLE_STORAGE_KEY);
    }

    setAnswers(makeAnswerState());
    setStatuses(makeStatusState());
    setIsPuzzleOpen(false);
    setView("site");
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
        onReorderDrop={handleReorderDrop}
        onReorderSubmit={handleReorderSubmit}
        onReorderHint={handleReorderHint}
        reorderHintActive={reorderHintActive}
        onWordleChange={handleWordleChange}
        onWordleSubmit={handleWordleSubmit}
        onClose={() => setIsPuzzleOpen(false)}
      />
      <ResetProgressButton onReset={handleResetProgress} />
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
