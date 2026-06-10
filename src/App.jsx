import React, { useEffect, useState } from "react";

const theme = {
  bg: "bg-[#FAFAFA]",
  text: "text-[#222222]",
  border: "border-[#eaeaea]",
};

const timelineImageExtensions = {
  1: "jpeg",
  2: "JPG",
  3: "jpeg",
  4: "jpeg",
  5: "jpeg",
  6: "jpeg",
  7: "jpeg",
  8: "jpeg",
  9: "jpeg",
  10: "jpeg",
  11: "jpeg",
  12: "jpeg",
  13: "jpeg",
  14: "jpeg",
  15: "jpeg",
  16: "jpeg",
  17: "jpeg",
  18: "jpeg",
  19: "jpeg",
  20: "JPG",
  21: "jpeg",
  22: "jpeg",
  23: "jpeg",
  24: "jpeg",
  25: "jpeg",
  26: "jpeg",
  27: "JPG",
  28: "JPG",
  29: "jpeg",
  30: "jpeg",
};

const timelineEntries = [
  {
    id: "timeline-1",
    title: "ROADHOUSE TIME",
    description:
      "You brought me so rolls and food from your birthday cookout, so sweet of you to do this so early on, I love ya so much!",
  },
  {
    id: "timeline-2",
    title: "ESBEN IN ASIA",
    description:
      "You made this pic and sent it to me while I was in Asia, not much more to it but it looks just like me it’s so well drawn, I LOVE YA SO MUCH WEEEEE",
  },
  {
    id: "timeline-3",
    title: "CHIPOTLEEE",
    description:
      "You hooked me up with free comida and wow wow wow it was so amazing of you to do all that for me I love you so much!",
  },
  {
    id: "timeline-4",
    title: "NEW YORK NEW YORK",
    description:
      "This pic was you copying the style of the one I took in Vietnam, it made me smile smile smile… I LOVE YA",
  },
  {
    id: "timeline-5",
    title: "VEGAS BABAYYYYY",
    description:
      "This was my favorite trip from the Vegas trip (jetskis were awesome), and this was the birth of the greatest groupie photo of all time……. I LOVE YOUUUUUU",
  },
  {
    id: "timeline-6",
    title: "WHITE LINEN LINEN LINEN",
    description:
      "This was us getting ready for white linen, and even though you did not have the most fun, I would have had an awful time if you were not there. THIS IS WHY I LOVE YOU!",
  },
  {
    id: "timeline-7",
    title: "AGS BY 90",
    description:
      "This was our first Aggie football game together and I'm so glad that you're there with me for every future game we're gonna win the natty WOOOOOO I LOVE YOU RAHHH",
  },
  {
    id: "timeline-8",
    title: "YUMMY YUMMY",
    description:
      "When we made mini pancakes and it accidentally turned into the greatest breakfast sandwich of all time… YOU ARE A VISIONARY I LOVE YOU!!!!!!",
  },
  {
    id: "timeline-9",
    title: "OKTOBAH_FEST",
    description:
      "Dippin dots at this place were GAS and a little overpriced but anything is worth getting that smile on your face WEEEEEEE I LOVE YA I LOVE YA",
  },
  {
    id: "timeline-10",
    title: "GUMBYS",
    description:
      "This was the first time we got gumbos together and BROTHER that jawn was so good… but not as yummy as YOUUUU (which I love)",
  },
  {
    id: "timeline-11",
    title: "TRIP TO CSTAT",
    description:
      "Watching the auburn game was only fun because you were there (and we won). YOU ARE MY GOOD LUCK CHARM I LOVE YOU RADDA",
  },
  {
    id: "timeline-12",
    title: "PHO IN THE STAT",
    description:
      "First time getting pho in college station and it was pretty good, but it didn’t looks good as YOUUUUU I LOVE YA",
  },
  {
    id: "timeline-13",
    title: "LEGO LEGO LEGO",
    description:
      "Our little lego project, it wasn’t huge but it was so much fun, also it looks great on my shelf WEEWOOWEEWOO I LOVE YOU YOU YOU",
  },
  {
    id: "timeline-14",
    title: "HALLOWEENY",
    description:
      "Halloween party in Houston, it was the first time you met Juan and John and we had so much fun… plus you were pretty drunky… I LOVE LOVE LOVE KAREEN BLANCOOOOOO",
  },
  {
    id: "timeline-15",
    title: "POST CAR CRASH",
    description:
      "even though the deer was there, you were the one who picked my cute hitchhiker ahh up. You’re so real frfr I love you so much… I LOVE YOU",
  },
  {
    id: "timeline-16",
    title: "PRINCE STREET PIZZA",
    description: "This pizza was so gas and food always tastes better with you. I LOVE YOU SO SO SO MUCH",
  },
  {
    id: "timeline-17",
    title: "REMOTE AGS",
    description:
      "nothing gets between us watching the best team ever play the best game ever……. I……. LOVE…… YOU…… WEEEEEE",
  },
  {
    id: "timeline-18",
    title: "BFAST BEGALS",
    description:
      "breakfast bengals were gas as fugggg and I just love making breakfast with you, it always ends up so gas gas gas. I LOVE YOU SO SO MUCH RADDA RADDA",
  },
  {
    id: "timeline-19",
    title: "BEST PHO EVAAAA",
    description:
      "We will never miss the chance to get ba le pho, and Ive only gotten it once without you and its ass (still gas but better with you)… man I love ya so much gal",
  },
  {
    id: "timeline-20",
    title: "CHRISTMAAAAS",
    description:
      "Christmas party was so fun to you, and even though I got sick and also clogged the toilet right before you had to dump before the party, I still had so much with you because we got to be together… and I LOVE BEING WITH YOU BECAUSE I LOVE YOU",
  },
  {
    id: "timeline-21",
    title: "GUNNNEERRRR",
    description:
      "We got to go shooting together and YOU HIT SOME MF CLAYS, you deadass might as well be a military sniper w that aim, you’re so amazing I love you so much",
  },
  {
    id: "timeline-22",
    title: "SNOW DAYYYY",
    description:
      "This walk to fiesta was so so so much fun, I never miss the chance to have fun with you, I cannot wait until we have 1,000,000 more adventures together!!!! BECAUSE I LOVE YOU",
  },
  {
    id: "timeline-23",
    title: "PLOMO DOMO",
    description:
      "Plomo was gas ngl but that shit sat so heavily so we had to go to our usual walking spot down lower Greenville, so much fun going to new places with you weeeeeee WWEEEEEE I LOVE YOU",
  },
  {
    id: "timeline-24",
    title: "ANIMAL TIMEEEE",
    description:
      "Fort Worth zoo was so much fun and seeing your eyes light up when you saw the animals made me so so so happy… you know why? BECAUSE I LOVE LOVE LOVE KAREN KAREN KAREN",
  },
  {
    id: "timeline-25",
    title: "PAN DE BONO",
    description:
      "This was so gas and made me feel a bit fat because of how many I damn near swallowed whole lmao… and you made them so so well… I LOVE YOU WEEWEWEWWWEEEEE",
  },
  {
    id: "timeline-26",
    title: "BARNES AND NOBLE",
    description:
      "This wasn’t the first time at barnes and noble, but it was the time that caused us to go again and again lmaooooo I love books…. AND YOUUUUUUU",
  },
  {
    id: "timeline-27",
    title: "ENGAGEMENT PARTAYYYYYYY",
    description:
      "Will’s engagement party made me see what type of houses we will be looking at as goest houses in the future because WE WILL SUCCEED TOGETHER BECAUSE I LOVE YOU",
  },
  {
    id: "timeline-28",
    title: "CABIN GETAWAYYYYY",
    description:
      "this was our little Oklahoma couples trip (we were the only couple), I had so much fun with you and ripping terraforming mars and watching hella movies was the BEST, and it was splendid because I LOVE KAREN I LOVE KAREN I LOVE KAREN",
  },
  {
    id: "timeline-29",
    title: "GRADDYYY",
    description:
      "Johan’s graduation party was su fun together, we got to dance together and eat that BUSSS AHHH CAKE, I love going to events with you and I love YYOUUUUUUUU",
  },
  {
    id: "timeline-30",
    title: "THANK YOU THANK YOU",
    description:
      "This isn’t any big event or anything, it was just the most recent picture I had uwu, typing all these and getting em on here took a while but MAN…. I love talking and typing about how much I love you and getting to look through pictures to make this timeline was so much fun, but not as fun as when I get to see that BIG FAT SMILE when I see you reading this…. I… LOVE…. KAREN…. BLANCO…. SO…. SO…. SO…. MUCH WEEEEEEEE RADDA RADDA RADDA BOOM BOOM SHAKALAKA WEEE I LOVE YOU!!!!!!!",
  },
].map((entry, index) => ({
  ...entry,
  src: new URL(`../images/timeline/timeline_${index + 1}.${timelineImageExtensions[index + 1]}`, import.meta.url)
    .href,
}));

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

const everydayGalleryImagePaths = [
  "/images/gallery/2214F646-A0A4-428F-B64E-EF995ED596EA.jpg",
  "/images/gallery/76870454414__A23B06F5-FB4A-465B-959C-ED000F5FD612.fullsizerender.jpeg",
  "/images/gallery/IMG_0034.jpeg",
  "/images/gallery/IMG_0052.jpeg",
  "/images/gallery/IMG_0197.jpeg",
  "/images/gallery/IMG_0622.jpeg",
  "/images/gallery/IMG_0683.jpeg",
  "/images/gallery/IMG_0704.jpeg",
  "/images/gallery/IMG_0925.JPG",
  "/images/gallery/IMG_0928.JPG",
  "/images/gallery/IMG_0931.JPG",
  "/images/gallery/IMG_1089.JPG",
  "/images/gallery/IMG_1121.jpeg",
  "/images/gallery/IMG_2083.jpeg",
  "/images/gallery/IMG_2087.jpeg",
  "/images/gallery/IMG_2209.jpeg",
  "/images/gallery/IMG_2212.jpeg",
  "/images/gallery/IMG_2230.jpeg",
  "/images/gallery/IMG_3194.JPG",
  "/images/gallery/IMG_3250.jpeg",
  "/images/gallery/IMG_4070.jpeg",
  "/images/gallery/IMG_4100.jpeg",
  "/images/gallery/IMG_4552.JPG",
  "/images/gallery/IMG_4861.jpeg",
  "/images/gallery/IMG_4961.jpg",
  "/images/gallery/IMG_5055.jpg",
  "/images/gallery/IMG_6777.JPG",
  "/images/gallery/IMG_7405.jpeg",
  "/images/gallery/IMG_7496.PNG",
  "/images/gallery/IMG_7525.jpeg",
  "/images/gallery/IMG_7546.jpeg",
  "/images/gallery/IMG_7555.jpeg",
  "/images/gallery/IMG_7587.jpeg",
  "/images/gallery/IMG_7605.jpeg",
  "/images/gallery/IMG_7606.jpeg",
  "/images/gallery/IMG_7704.jpeg",
  "/images/gallery/IMG_7729.jpeg",
  "/images/gallery/IMG_7731.jpeg",
  "/images/gallery/IMG_8059.jpeg",
  "/images/gallery/IMG_8061.jpeg",
  "/images/gallery/IMG_8063.jpeg",
  "/images/gallery/IMG_8064.jpeg",
  "/images/gallery/IMG_8091.jpeg",
  "/images/gallery/IMG_8092.jpeg",
  "/images/gallery/IMG_8097.jpeg",
  "/images/gallery/IMG_8098.jpeg",
  "/images/gallery/IMG_8143.jpeg",
  "/images/gallery/IMG_8146.jpeg",
  "/images/gallery/IMG_8301.jpeg",
  "/images/gallery/IMG_8330.jpeg",
  "/images/gallery/IMG_8335.jpeg",
  "/images/gallery/IMG_8380.jpeg",
  "/images/gallery/IMG_8382.jpeg",
  "/images/gallery/IMG_8385.jpeg",
  "/images/gallery/IMG_8386.jpeg",
  "/images/gallery/IMG_8456.jpeg",
  "/images/gallery/IMG_8488.jpeg",
  "/images/gallery/IMG_8533.jpeg",
  "/images/gallery/IMG_8617.jpeg",
  "/images/gallery/IMG_8673.jpeg",
  "/images/gallery/IMG_8674.jpeg",
  "/images/gallery/IMG_8680.jpeg",
  "/images/gallery/IMG_9147.jpeg",
  "/images/gallery/IMG_9158.jpeg",
  "/images/gallery/IMG_9200.jpeg",
  "/images/gallery/IMG_9383.jpeg",
  "/images/gallery/IMG_9733.jpeg",
  "/images/gallery/IMG_9842.jpeg",
  "/images/gallery/bignose.jpeg",
  "/images/gallery/lp_image (1).jpeg",
  "/images/gallery/lp_image (2).jpeg",
  "/images/gallery/lp_image.jpeg",
];

const shuffleArray = (items) => {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
};

const albums = [
  {
    name: "Everyday",
    photos: everydayGalleryImagePaths.map((src) => ({ src, caption: "" })),
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
    prompt: "The final note is still jammed. Fill the crossword clues.",
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
    repair: "The final note locks into place.",
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

const PUZZLE_STORAGE_KEY = "karen-anniversary-puzzle-progress-v5";
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

const Nav = ({ solvedCount, allFixed }) => (
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
        <nav className={`hidden gap-6 text-sm sm:flex ${solvedCount >= 1 ? "" : "opacity-65"}`}>
          <a className="hover:opacity-70" href="#timeline">
            {solvedCount >= 2 ? "Timeline" : scrambleText("Timeline")}
          </a>
          <a className="hover:opacity-70" href="#gallery">
            {solvedCount >= 3 ? "Gallery" : scrambleText("Gallery")}
          </a>
          <a className="hover:opacity-70" href="#about">
            {solvedCount >= 4 ? "About" : scrambleText("About")}
          </a>
        </nav>
        <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900">
          Repairs
          <Scribble />
          <span className="rounded-full bg-neutral-900 px-1.5 py-0.5 text-[10px] text-white">
            {solvedCount}/{puzzles.length}
          </span>
        </div>
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
                ? "Karen, this little corner of the internet is reserved to celebrate our UNO AÑO, I love you more and more every single day!!!! Ever since we met I have had so much fun with you, and here is to every adventure we have had and every one we will have moving forward. YOU DA BEST RADDA RADDA"
                : scrambleText(
                    "Karen, this little corner of the internet is broken in a very suspiciously dramatic way. Fix it."
                  )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenPuzzle("memory-questions")}
                className="group inline-flex items-center gap-3 rounded-[1.75rem] border-2 border-dashed border-neutral-900 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[4px_4px_0_0_rgba(34,34,34,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-1deg]"
              >
                <span className="leading-none">repair the homepage</span>
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

const PuzzleModal = ({
  puzzle,
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
  if (!puzzle) return null;

  const solved = statuses[puzzle.id];

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
                {puzzle.prompt}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 sm:text-base">
                Solve this repair to restore the matching broken section of the site.
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

          <div
            className={`mt-6 rounded-2xl border p-4 transition ${
              solved ? "border-emerald-300 bg-emerald-50/60" : "border-neutral-200 bg-white"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                {puzzle.id.replace(/-/g, " ")}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                  solved ? "bg-emerald-600 text-white" : "bg-neutral-900 text-white"
                }`}
              >
                {solved ? "fixed" : "active"}
              </span>
            </div>

            {puzzle.type === "bundle" ? (
              <BundlePuzzle
                puzzle={puzzle}
                value={answers[puzzle.id]}
                onChange={onBundleChange}
                onSubmit={onBundleSubmit}
                solved={solved}
              />
            ) : null}

            {puzzle.type === "crossword" ? (
              <CrosswordPuzzle
                puzzle={puzzle}
                value={answers[puzzle.id]}
                onChange={onCrosswordChange}
                onSubmit={onCrosswordSubmit}
                solved={solved}
              />
            ) : null}

            {puzzle.type === "reorder" ? (
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

            {puzzle.type === "wordle" ? (
              <WordlePuzzle
                puzzle={puzzle}
                value={answers[puzzle.id]}
                onChange={onWordleChange}
                onSubmit={onWordleSubmit}
                solved={solved}
              />
            ) : null}

            <p className={`mt-3 text-sm ${solved ? "text-emerald-700" : "text-neutral-500"}`}>
              {solved ? puzzle.repair : "Still broken."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Timeline = ({ solvedCount, onOpenPuzzle }) => {
  const fixed = solvedCount >= 2;

  return (
    <Section
      id="timeline"
      title={fixed ? "Timeline" : scrambleText("Timeline")}
      subtitle={fixed ? "A few milestones so far." : scrambleText("The dates are still resisting repair.")}
      className={fixed ? "" : "opacity-80"}
    >
      {!fixed ? (
        <button
          type="button"
          onClick={() => onOpenPuzzle("timeline-order")}
          className="mb-5 rounded-full border-2 border-dashed border-neutral-900 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:rotate-[1deg]"
        >
          Repair the timeline
        </button>
      ) : null}
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
                  <div className="flex items-center justify-between gap-3 text-xs text-neutral-600">
                    <span>memory {index + 1}</span>
                    <span>timeline_{index + 1}</span>
                  </div>
                  <img
                    src={item.src}
                    alt={item.title}
                    className={`mt-3 aspect-[4/5] w-full rounded-[1.5rem] object-cover transition ${
                      fixed ? "" : "blur-sm saturate-50"
                    }`}
                  />
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                    {fixed ? item.title : scrambleText(item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                    {fixed
                      ? item.description || "No caption for this one, just the memory."
                      : scrambleText(item.description || "No caption for this one, just the memory.")}
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

const Gallery = ({ solvedCount, onOpenPuzzle }) => {
  const fixed = solvedCount >= 3;
  const [everydayPhotos] = useState(() => shuffleArray(albums[0].photos));
  const displayAlbums = [
    { ...albums[0], photos: everydayPhotos },
    ...albums.slice(1),
  ];

  return (
    <Section
      id="gallery"
      title={fixed ? "Gallery" : scrambleText("Gallery")}
      subtitle={fixed ? "The good stuff is back." : scrambleText("The pictures are still sulking.")}
      className={fixed ? "" : "opacity-65"}
    >
      {!fixed ? (
        <button
          type="button"
          onClick={() => onOpenPuzzle("site-kit")}
          className="mb-5 rounded-full border-2 border-dashed border-neutral-900 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:rotate-[-1deg]"
        >
          Repair the last section
        </button>
      ) : null}
      <div className="space-y-8">
        {displayAlbums.map((album) => (
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
                  {photo.caption ? (
                    <figcaption className="mt-1 text-xs text-neutral-500">
                      {fixed ? photo.caption : "???"}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const About = ({ solvedCount, onOpenPuzzle }) => {
  const fixed = solvedCount >= 4;

  return (
    <Section
      id="about"
      title={fixed ? "About us" : scrambleText("About us")}
      subtitle={fixed ? "A little overview." : scrambleText("Final note still encrypted.")}
    >
      {!fixed ? (
        <button
          type="button"
          onClick={() => onOpenPuzzle("crossword")}
          className="mb-5 rounded-full border-2 border-dashed border-neutral-900 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:rotate-[-1deg]"
        >
          Repair the final note
        </button>
      ) : null}
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
  const [activePuzzleId, setActivePuzzleId] = useState(null);
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
    if (!activePuzzleId || typeof window === "undefined") return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePuzzleId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePuzzleId]);

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
    setActivePuzzleId(null);
    setView("site");
  };

  if (view === "final") {
    return <FinalPage onBack={() => setView("site")} />;
  }

  const activePuzzle = puzzles.find((puzzle) => puzzle.id === activePuzzleId) ?? null;

  return (
    <div className={`${theme.bg} min-h-screen ${theme.text}`}>
      <PuzzleModal
        puzzle={activePuzzle}
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
        onClose={() => setActivePuzzleId(null)}
      />
      <ResetProgressButton onReset={handleResetProgress} />
      {allFixed ? <FinalUnlock onOpenFinalPage={() => setView("final")} /> : null}
      <Nav solvedCount={solvedCount} allFixed={allFixed} />
      <Hero solvedCount={solvedCount} onOpenPuzzle={setActivePuzzleId} />
      <Timeline solvedCount={solvedCount} onOpenPuzzle={setActivePuzzleId} />
      <Gallery solvedCount={solvedCount} onOpenPuzzle={setActivePuzzleId} />
      <About solvedCount={solvedCount} onOpenPuzzle={setActivePuzzleId} />
      <Footer solvedCount={solvedCount} />
    </div>
  );
}
