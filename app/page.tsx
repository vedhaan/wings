import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CourseSection from "@/components/CourseSection";
import HowItWorks from "@/components/HowItWorks";
import FindUs from "@/components/FindUs";
import Faq from "@/components/Faq";
import About from "@/components/About";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { KIDS_COURSES, PRO_COURSES } from "@/lib/courses";
import { SHOW_FIND_US } from "@/lib/site";
import JourneyRail from "@/components/JourneyRail";

export default function Home() {
  // each wave must match the color of whatever sits above it
  const faqFrom = SHOW_FIND_US ? "#FBF6EC" : "#14183F";

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />

        <CourseSection
          id="kids"
          theme="cyan"
          chip="For school students"
          title="Courses for school students"
          subtitle="Pick the course that fits your child."
          courses={KIDS_COURSES}
          levelLabel="Age / class"
          layout="stagger"
          watermark="KIDS"
          from="#FBF6EC"
        />

        <CourseSection
          id="professionals"
          theme="violet"
          chip="For working professionals"
          title="Courses for working professionals"
          subtitle="Pick the skill that moves your work forward."
          courses={PRO_COURSES}
          levelLabel="Suited for"
          layout="bento"
          watermark="PROS"
          from="#D5F3FA"
        />

        <HowItWorks />
        <FindUs from="#14183F" />
        <Faq from={faqFrom} />
        <About from="#FFE5D1" />
        <FinalCta from="#FBF6EC" />
      </main>
      <Footer from="#F77B24" />
    </>
  );
}