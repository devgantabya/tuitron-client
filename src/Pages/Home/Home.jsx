import { Link } from "react-router";
import Banner from "../../Components/Banner/Banner";
import LatestTuitions from "../../Components/LatestTuitions/LatestTuitions";
import LatestTutors from "../../Components/LatestTutors/LatestTutors";
import WhyChooseTuitron from "../../Components/WhyChooseTuitron/WhyChooseTuitron";
import HowToWorks from "../../Components/HowToWorks/HowToWorks";
import BecomeTutor from "../../Components/BecomeTutor/BecomeTutor";
import FAQ from "./../../Components/FAQ/FAQ";
import ContactSection from "../../Components/ContactSection/ContactSection";
import Testimonials from "../../Components/Testimonials/Testimonials";
import PlatformStats from "../../Components/PlatformStats/PlatformStats";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Banner />
      <HowToWorks />
      <LatestTuitions />
      <LatestTutors />
      <WhyChooseTuitron />
      <PlatformStats />
      <BecomeTutor />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </div>
  );
}
