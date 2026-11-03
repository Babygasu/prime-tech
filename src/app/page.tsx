import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/Solutions";
import { TechInAction } from "@/components/sections/TechInAction";
import { Approach } from "@/components/sections/Approach";
import { WhyUs } from "@/components/sections/WhyUs";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Solutions />
      <TechInAction />
      <Approach />
      <WhyUs />
      <Projects />
      <Contact />
    </>
  );
}
