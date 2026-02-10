import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import BetterWay from "@/components/sections/BetterWay";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Audience from "@/components/sections/Audience";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import GSAPProvider from "@/components/providers/GSAPProvider";

export default function Home() {
  return (
    <GSAPProvider>
      <main>
        <Hero />
        <Problem />
        <BetterWay />
        {/* <Solution /> */}
        <HowItWorks />
        {/* <Audience /> */}
        <FinalCTA />
        <Footer />
      </main>
    </GSAPProvider>
  );
}
