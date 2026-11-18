export type Faq = { q: string; a: string | null };
export type FaqTab = "kids" | "professionals" | "women";

const SHARED: Faq[] = [
  {
    q: "Where are classes held?",
    a: "Classes are held offline in Bhavnagar.",
  },
  {
    q: "How do I enquire or enroll?",
    a: "Message us on WhatsApp with the course you are interested in, and we will reply with the details.",
  },
  { q: "What are the batch timings?", a: null },
  { q: "What are the fees?", a: null },
  { q: "Do you offer a demo class?", a: null },
  { q: "Will I get a certificate?", a: null },
];

export const FAQS: Record<FaqTab, Faq[]> = {
  kids: [
    {
      q: "Which courses are for school students?",
      a: "Coding basics (Scratch and Python), AI tools and robotics, and computer and digital skills (Office and Canva).",
    },
    { q: "What age or class can join?", a: null },
    { q: "How long are the courses?", a: null },
    ...SHARED,
  ],
  professionals: [
    {
      q: "Which courses are for working professionals?",
      a: "Web development, digital marketing, AI tools and automation, and Excel, data and office productivity.",
    },
    { q: "Are classes suitable for beginners?", a: null },
    { q: "How long are the courses?", a: null },
    ...SHARED,
  ],
  women: [
    {
      q: "Which courses are for women entrepreneurs?",
      a: "Digital marketing and social media for business, website or online store setup, Excel, accounts and finance basics, and WhatsApp Business and customer handling.",
    },
    {
      q: "Do I need to already have a business?",
      a: "No. This stream is for women who already run a business and for women who want to start one.",
    },
    { q: "Are the batches only for women?", a: null },
    { q: "How long are the courses?", a: null },
    ...SHARED,
  ],
};