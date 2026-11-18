export type Course = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  duration: string | null;
  level: string | null; // age or class for kids, who it suits for professionals
  outcome: string | null; // what the student can do by the end
};

export const KIDS_COURSES: Course[] = [
  {
    id: "kids-coding",
    title: "Coding basics",
    blurb: "Learn how programming works, step by step, with Scratch and Python.",
    tags: ["Scratch", "Python"],
    duration: "1 Month",
    level: "5-8",
    outcome: null,
  },
  {
    id: "kids-ai-robotics",
    title: "AI tools and robotics",
    blurb:
      "Explore how AI tools and simple robots work, and how to use them well.",
    tags: ["AI tools", "Robotics"],
    duration: null,
    level: null,
    outcome: null,
  },
  {
    id: "kids-digital",
    title: "Computer and digital skills",
    blurb: "Get confident with computers, Office apps and Canva.",
    tags: ["Computer basics", "Office", "Canva"],
    duration: null,
    level: null,
    outcome: null,
  },
];

export const PRO_COURSES: Course[] = [
  {
    id: "pro-web",
    title: "Web development",
    blurb: "Learn to build websites and web apps from the ground up.",
    tags: [],
    duration: null,
    level: null,
    outcome: null,
  },
  {
    id: "pro-marketing",
    title: "Digital marketing",
    blurb: "Understand how businesses find and win customers online.",
    tags: [],
    duration: null,
    level: null,
    outcome: null,
  },
  {
    id: "pro-ai",
    title: "AI tools and automation",
    blurb: "Use AI tools to work faster and automate repetitive tasks.",
    tags: [],
    duration: null,
    level: null,
    outcome: null,
  },
  {
    id: "pro-excel",
    title: "Excel, data and office productivity",
    blurb: "Get confident with Excel, data and everyday office tools.",
    tags: [],
    duration: null,
    level: null,
    outcome: null,
  },
];