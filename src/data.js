// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE ONLY. Every personal string on the site lives here.
// Anything marked TODO is a placeholder — replace before deploying.
//
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Yuvraj Gupta",
  firstName: "Yuvraj",
  role: "Software Engineer in Training",
  // TODO: confirm city
  location: "India",
  timezoneLabel: "IST · India",
  timezone: "Asia/Kolkata",
  email: "yuvrajg151@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1xI_LHjvpupfUFUhwcwhbW4FhQtYB1lwf/view?usp=sharing",
  // TODO: confirm target internship season
  availability: "Open to SWE internships",
  intro:
    "Hi, I'm Yuvraj Gupta, an engineering undergrad building toward software engineering roles. I spend my time on data structures & algorithms and shipping web projects with React, Vite and Tailwind. If you're hiring interns or just want to talk shop, my inbox is open.",
  about:
    "I'm a student who codes daily — working through interview-style DSA practice while building side projects to keep the practical muscles sharp. I like clean UIs, readable code, and problems that look impossible for the first twenty minutes.",
  beyond:
    "Away from the keyboard I solve Rubik's cubes. The one on the home page is real three.js — scramble it, then solve it back one move at a time.",
};

export const socials = [
  { label: "GitHub", icon: "github", url: "https://github.com/yuvzg" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/yuvrajguptaa/" },
  { label: "LeetCode", icon: "leetcode", url: "https://leetcode.com/u/RookieG/" },
  { label: "Email", icon: "mail", url: "mailto:yuvrajg151@gmail.com" },
];

// TODO: set your real city + coordinates (currently New Delhi)
export const map = {
  city: "New Delhi, India",
  lat: 28.6139,
  lng: 77.209,
  zoom: 11,
};

// Optional: paste a Formspree/Getform endpoint URL here to receive
// form submissions directly. Empty string = the form falls back to
// opening the visitor's email client with the message pre-filled.
export const formEndpoint = "";

export const statsUsernames = {
  github: "yuvzg",
  leetcode: "RookieG",
};

export const stack = [
  "JavaScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "HTML",
  "CSS",
  "Motion",
  "Three.js",
  "C++",
  "Python",
  "SQL",
  "Git",
  "Data Structures",
  "Algorithms",
];

// Pulled from github.com/yuvzg — descriptions expanded from repo
// READMEs. TODO: flesh these out; two repos have no README/description
// on GitHub, which recruiters will see when they click through.
export const projects = [
  {
    name: "Navyik",
    description:
      "A reading and documentation platform concept — a productive, distraction-free space for docs and general reading, with AI-assisted features layered on top.",
    tags: ["Product", "AI", "In progress"],
    url: "https://github.com/yuvzg/navyik",
  },
  {
    name: "Chat Application",
    description:
      "Real-time chat application project. TODO: add a README and one-paragraph description on GitHub — the repo is currently empty to visitors.",
    tags: ["Web", "Real-time"],
    url: "https://github.com/yuvzg/Chat-application",
  },
  {
    name: "This Portfolio",
    description:
      "The site you're looking at — dark bento layout with client-side routing, page transitions, and an interactive three.js Rubik's cube you can scramble and solve.",
    tags: ["React 19", "Tailwind v4", "Three.js", "Motion"],
    url: "https://github.com/yuvzg/myportfolio",
  },
];

export const now = {
  date: "July 2026",
  items: [
    "Grinding DSA for SWE internship season",
    "Building and shipping small web projects to learn in public",
    "Rebuilding this portfolio with routing and three.js",
  ],
};
