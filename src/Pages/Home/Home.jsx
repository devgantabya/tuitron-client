import { Link } from "react-router";
import Banner from "../../Components/Banner/Banner";
import LatestTuitions from "../../Components/LatestTuitions/LatestTuitions";
import LatestTutors from "../../Components/LatestTutors/LatestTutors";
import WhyChooseTuitron from "../../Components/WhyChooseTuitron/WhyChooseTuitron";
import HowToWorks from "../../Components/HowToWorks/HowToWorks";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Banner />
      <LatestTuitions />
      <LatestTutors />
      <WhyChooseTuitron />
      <HowToWorks />

      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Start Your Learning Journey Today!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Join Tuitron as a student or tutor and unlock new opportunities.
        </p>

        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
