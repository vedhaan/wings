export type Person = {
  id: string;
  name: string;
  role: string;
  photo: string | null; // e.g. "/images/founders/stuti-pandya.jpg"
  bio: string | null;
  linkedin: string | null;
  tone: "cyan" | "violet";
};

export const OWNER = {
  name: "Vedhaan Technology",
  label: "Owner",
  logo: null as string | null, // e.g. "/images/vedhaan-logo.png"
};

export const COFOUNDERS: Person[] = [
  {
    id: "reena-goyal",
    name: "Reena Goyal",
    role: "Co-founder",
    photo: '/images/founders/reena-goyal.png',
    bio: null,
    linkedin: null,
    tone: "violet",
  },
  {
    id: "stuti-pandya",
    name: "Stuti Pandya",
    role: "Co-founder",
    photo: '/images/founders/stuti-pandya.png',
    bio: null,
    linkedin: null,
    tone: "cyan",
  },
];