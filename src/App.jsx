import React, { useEffect, useState } from "react";

// ————————————————
// THEME A (Minimal & Modern)
// ————————————————
const theme = {
  bg: "bg-[#FAFAFA]",
  text: "text-[#222222]",
  accent: "text-[#F28CA3]",
  accentBg: "bg-[#F28CA3]",
  card: "bg-white",
  border: "border-[#eaeaea]",
};

// ————————————————
// FILLER CONTENT (edit me gradually)
// ————————————————
const logs = [
  {
    slug: "first-lattes",
    title: "Iced lattes & nervous laughs",
    date: "2025-05-04",
    location: "Local café",
    mood: "grateful",
    heroImage: "/images/logs/first-lattes.jpg",
    excerpt:
      "I still hear the clink of ice and your laugh when I think about that first hour…",
    body: [
      "Karen, I didn’t expect a two-hour coffee to feel like ten minutes.",
      "You always find the funny angle before I find the words.",
      "I learned that day that ‘comfortable’ can happen fast—and I loved that.",
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
    mood: "peaceful",
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
    date: "2025-04-01",
    title: "First messages",
    blurb: "Memes, late replies, and a suspicious number of exclamation points.",
    photo: "/images/timeline/first-messages.jpg",
  },
  {
    date: "2025-05-04",
    title: "First coffee date",
    blurb: "Iced lattes, no plan, somehow everything to say.",
    photo: "/images/timeline/first-date.jpg",
  },
  {
    date: "2025-06-10",
    title: "Rain walk",
    blurb: "Shared earbuds + puddle jumping.",
  },
  {
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
    id: "messages",
    prompt: "Before any of this, what app did we first talk on?",
    hint: "It is also the reason your algorithm probably thinks we like tacos.",
    answers: ["hinge"],
    repair: "The hero unscrambles and remembers where this started.",
  },
  {
    id: "weather",
    prompt: "What kind of weather showed up for the walk with shared earbuds?",
    hint: "The answer is in the title of one of the logs.",
    answers: ["rain", "rainy"],
    repair: "The logs stop drifting and settle back into place.",
  },
  {
    id: "drink",
    prompt: "Which drink keeps showing up in our first-date lore?",
    hint: "Cold, caffeinated, and mentioned more than once.",
    answers: ["latte", "lattes", "iced latte", "iced lattes"],
    repair: "The timeline, gallery, and final note come back online.",
  },
];

const normalizeAnswer = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, " ");

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

// ————————————————
// UI PRIMITIVES
// ————————————————
const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Section = ({ id, title, subtitle, className = "", children }) => (
  <section id={id} className={`py-12 transition-all duration-500 sm:py-16 ${className}`}>
    <Container>
      <div className="mb-8">
        <h2 className={`text-2xl font-semibold sm:text-3xl ${theme.text}`}>{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">{subtitle}</p>
        )}
      </div>
      {children}
    </Container>
  </section>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`${theme.card} rounded-2xl border ${theme.border} p-5 shadow-sm ${className}`}
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

// ————————————————
// SECTIONS
// ————————————————
const Nav = ({ solvedCount, onOpenPuzzle }) => (
  <header className="sticky top-0 z-40 border-b border-neutral-200 backdrop-blur supports-[backdrop-filter]:bg-white/70">
    <Container>
      <div className="flex h-14 items-center justify-between gap-3">
        <a href="#home" className="font-semibold tracking-tight">
          E ❤ K
        </a>
        <nav className="hidden gap-6 text-sm sm:flex">
          <a className="hover:opacity-70" href="#logs">
            Logs
          </a>
          <a className="hover:opacity-70" href="#timeline">
            Timeline
          </a>
          <a className="hover:opacity-70" href="#gallery">
            Gallery
          </a>
          <a className="hover:opacity-70" href="#about">
            About
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

const Hero = ({ startDate, endDate, solvedCount, onOpenPuzzle }) => {
  const isFixed = solvedCount > 0;

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
                isFixed ? "" : "rotate-[-1.5deg]"
              }`}
            >
              {isFixed ? "HAPPY ONE YEAR KAREN RAHHH!!!!" : scrambleText("HAPPY ONE YEAR KAREN RAHHH!!!!")}
            </h1>
            <p className="mt-3 text-neutral-700 sm:text-lg">
              {startDate} → {endDate}
            </p>
            <p className={`mt-6 max-w-prose text-neutral-700 transition-all duration-500 ${isFixed ? "" : "blur-[2px]"}`}>
              Karen, I’m building this little corner of the internet to save our tiny-big moments.
              It’ll grow as we do and now apparently it also needs your help. Fix the page, then collect
              what I was trying to say in the first place.
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
                  solvedCount === puzzles.length ? "opacity-100" : "pointer-events-none opacity-40"
                }`}
              >
                Open gallery
              </a>
            </div>
          </div>
          <div className={`order-1 transition-all duration-500 lg:order-2 ${isFixed ? "" : "rotate-2 saturate-50"}`}>
            <PlacePhoto
              src="/images/cover.jpeg"
              alt="My favorite photo of us"
              className={isFixed ? "" : "translate-y-2"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

const PuzzlePanel = ({
  isOpen,
  solvedCount,
  answers,
  statuses,
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/45 px-4 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl">
        <Card className="border-neutral-900 bg-[#fffdf8] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F28CA3]">
                repair protocol
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Karen has to fix the page
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 sm:text-base">
                Each right answer restores part of the site. These are meant to feel like memories,
                not trivia for strangers.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100"
            >
              close
            </button>
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

              return (
                <div
                  key={puzzle.id}
                  className={`rounded-2xl border p-4 transition ${
                    solved ? "border-emerald-300 bg-emerald-50/60" : "border-neutral-200 bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                        puzzle {index + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-neutral-900">{puzzle.prompt}</h3>
                      <p className="mt-2 text-sm text-neutral-600">{puzzle.hint}</p>
                    </div>
                    {solved ? (
                      <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                        fixed
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={answers[puzzle.id] ?? ""}
                      onChange={(event) => onChange(puzzle.id, event.target.value)}
                      placeholder="Type your answer"
                      className="min-w-0 flex-1 rounded-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                      disabled={solved}
                    />
                    <button
                      type="button"
                      onClick={() => onSubmit(puzzle.id)}
                      disabled={solved}
                      className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-default disabled:bg-neutral-300"
                    >
                      {solved ? "Solved" : "Repair"}
                    </button>
                  </div>

                  <p className={`mt-3 text-sm ${solved ? "text-emerald-700" : "text-neutral-500"}`}>
                    {solved ? puzzle.repair : "Still broken."}
                  </p>
                </div>
              );
            })}
          </div>

          {solvedCount === puzzles.length ? (
            <div className="mt-8 rounded-2xl border border-[#F28CA3]/40 bg-[#FDECEF] p-5 text-neutral-900">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D56A87]">
                everything is back
              </p>
              <p className="mt-3 text-base leading-7">
                You fixed the site, which feels correct because you also make everything else better.
              </p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

const LogsIndex = ({ solvedCount }) => (
  <Section
    id="logs"
    title="Logs"
    subtitle={solvedCount >= 2 ? "Short letters and memories." : "These memories are still a little scrambled."}
    className={solvedCount >= 2 ? "" : "rotate-[0.5deg]"}
  >
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Tag>firsts</Tag>
      <Tag>everyday</Tag>
      <Tag>trip</Tag>
      <span className="text-xs text-neutral-500">
        {solvedCount >= 2 ? "(Filters are just visual for now.)" : "(Repair puzzle 2 to settle these back down.)"}
      </span>
    </div>

    <div className="grid gap-6 sm:grid-cols-2">
      {logs.map((log, index) => (
        <Card
          key={log.slug}
          className={`transition-all duration-500 ${
            solvedCount >= 2
              ? ""
              : index % 2 === 0
                ? "-rotate-2 translate-y-3 blur-[1px]"
                : "rotate-2 -translate-y-2 blur-[1px]"
          }`}
        >
          <div className="grid gap-3">
            <PlacePhoto src={log.heroImage} alt={log.title} />
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>{log.date}</span>
              <span>{log.location}</span>
            </div>
            <h3 className="text-lg font-semibold">{log.title}</h3>
            <p className="text-sm text-neutral-700">{log.excerpt}</p>
            <div className="flex gap-2">
              {log.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <details className="group mt-2">
              <summary className="cursor-pointer select-none text-sm underline decoration-neutral-300 hover:decoration-neutral-700">
                Open log
              </summary>
              <div className="mt-3 space-y-3">
                {log.body.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-sm leading-relaxed text-neutral-800">
                    {paragraph}
                  </p>
                ))}
                {log.photos?.length ? (
                  <div className="grid grid-cols-2 gap-2">
                    {log.photos.map((photo, photoIndex) => (
                      <figure key={photoIndex}>
                        <PlacePhoto src={photo.src} alt={photo.caption} />
                        <figcaption className="mt-1 text-xs text-neutral-500">
                          {photo.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-neutral-500">(Add photos when you have them.)</div>
                )}
              </div>
            </details>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const Timeline = ({ solvedCount }) => (
  <Section
    id="timeline"
    title="Timeline"
    subtitle={
      solvedCount === puzzles.length
        ? "A few milestones so far."
        : "Still glitching. The dates are trying their best."
    }
  >
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-neutral-200 sm:left-1/2" />
      <div className="space-y-8">
        {timeline.map((item, index) => (
          <div key={item.date} className="relative sm:grid sm:grid-cols-2 sm:gap-8">
            <div className="absolute left-4 mt-2 h-3.5 w-3.5 -ml-[7px] rounded-full bg-black sm:left-1/2" />
            <div
              className={`transition-all duration-500 sm:col-span-1 ${
                index % 2 === 0 ? "sm:pr-12" : "sm:order-2 sm:pl-12"
              } ${
                solvedCount === puzzles.length
                  ? ""
                  : index % 2 === 0
                    ? "sm:-translate-x-3 rotate-[-2deg]"
                    : "sm:translate-x-3 rotate-[2deg]"
              }`}
            >
              <Card>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>{item.date}</span>
                  <span>{item.title}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-800">
                  {solvedCount === puzzles.length ? item.blurb : scrambleText(item.blurb)}
                </p>
                <div className="mt-3">
                  <PlacePhoto
                    src={item.photo}
                    alt={item.title}
                    className={solvedCount === puzzles.length ? "" : "grayscale"}
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

const Gallery = ({ solvedCount }) => (
  <Section
    id="gallery"
    title="Gallery"
    subtitle={
      solvedCount === puzzles.length
        ? "Drop photos in /images/gallery and refresh."
        : "Still partly locked until the last repair."
    }
    className={solvedCount === puzzles.length ? "" : "opacity-70"}
  >
    <div className="space-y-8">
      {albums.map((album) => (
        <div key={album.name}>
          <h3 className="mb-3 text-lg font-semibold">{album.name}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {album.photos.map((photo, index) => (
              <figure key={index} className={solvedCount === puzzles.length ? "" : "odd:translate-y-3 even:-translate-y-2"}>
                <PlacePhoto
                  src={photo.src}
                  alt={photo.caption}
                  className={solvedCount === puzzles.length ? "" : "sepia"}
                />
                <figcaption className="mt-1 text-xs text-neutral-500">
                  {solvedCount === puzzles.length ? photo.caption : "???"}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const About = ({ solvedCount }) => (
  <Section
    id="about"
    title="About us"
    subtitle={
      solvedCount === puzzles.length
        ? "A little overview."
        : "Final note is encrypted until everything is fixed."
    }
  >
    <Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          {solvedCount === puzzles.length ? (
            <p className="text-neutral-800">
              We started this story in spring 2025 with tacos and a 4-message interaction on hinge,
              and you have grown to be my favorite person ever. When we started dating, we only had a
              few weeks together before I went and spent a month in Asia away from you, which was a
              very stupid decision in one sense and a clarifying one in another because all I wanted
              was to get back to you. Coming back to you was amazing, and every moment I have had with
              you since has felt like proof that what I found in you is not just a girlfriend, but a
              best friend, a partner in crime, and my favorite person to keep building a life with.
              I love you and I cannot wait for year two.
            </p>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm leading-7 text-neutral-500">
              <p>{scrambleText("Final letter corrupted.")}</p>
              <p className="mt-2">{scrambleText("Solve the last puzzle to get the real version.")}</p>
            </div>
          )}
        </div>
        <div>
          <PlacePhoto
            src="/images/abtus.jpeg"
            alt="Photo strip"
            className={solvedCount === puzzles.length ? "" : "rotate-2 grayscale"}
          />
        </div>
      </div>
    </Card>
  </Section>
);

const Footer = ({ solvedCount }) => (
  <footer className="border-t border-neutral-200 py-10 text-center text-sm text-neutral-500">
    <Container>
      <p>
        © {new Date().getFullYear()} Esben + Karen ·{" "}
        {solvedCount === puzzles.length ? "Built with love" : "under emergency repair"}
      </p>
    </Container>
  </footer>
);

// ————————————————
// ROOT
// ————————————————
export default function AnniversarySite() {
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(puzzles.map((puzzle) => [puzzle.id, ""])),
  );
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(puzzles.map((puzzle) => [puzzle.id, false])),
  );

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

  const solvedCount = Object.values(statuses).filter(Boolean).length;

  const handleAnswerChange = (id, value) => {
    setAnswers((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const handlePuzzleSubmit = (id) => {
    const puzzle = puzzles.find((entry) => entry.id === id);

    if (!puzzle) return;

    const normalized = normalizeAnswer(answers[id] ?? "");
    const isCorrect = puzzle.answers.some((answer) => normalizeAnswer(answer) === normalized);

    if (!isCorrect) return;

    setStatuses((current) => ({
      ...current,
      [id]: true,
    }));
  };

  return (
    <div className={`${theme.bg} min-h-screen ${theme.text}`}>
      <PuzzlePanel
        isOpen={isPuzzleOpen}
        solvedCount={solvedCount}
        answers={answers}
        statuses={statuses}
        onChange={handleAnswerChange}
        onSubmit={handlePuzzleSubmit}
        onClose={() => setIsPuzzleOpen(false)}
      />
      <Nav solvedCount={solvedCount} onOpenPuzzle={() => setIsPuzzleOpen(true)} />
      <Hero
        startDate="2025-06-12"
        endDate="[literawy foreva]"
        solvedCount={solvedCount}
        onOpenPuzzle={() => setIsPuzzleOpen(true)}
      />
      <LogsIndex solvedCount={solvedCount} />
      <Timeline solvedCount={solvedCount} />
      <Gallery solvedCount={solvedCount} />
      <About solvedCount={solvedCount} />
      <Footer solvedCount={solvedCount} />
    </div>
  );
}
