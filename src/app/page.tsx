import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/Solutions";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { TechInAction } from "@/components/sections/TechInAction";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { WhyUs } from "@/components/sections/WhyUs";
import { Approach } from "@/components/sections/Approach";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Solutions />
      <ProductSpotlight />
      <TechInAction />
      <WhoWeServe />
      <WhyUs />
      <Approach />
      <Projects />
      <Contact />
    </>
  );
}
