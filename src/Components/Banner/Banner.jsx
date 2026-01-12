import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiChevronDown } from "react-icons/fi";
import findTutorSlide1 from "../../assets/find the perfect tutor for your learning journey.jpg";
import findTutorSlide2 from "../../assets/learn smarter with trusted and skilled tutors.jpg";
import findTutorSlide3 from "../../assets/teach earn and grow your career.jpg";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Find the Perfect Tutor for Your Learning Journey",
    desc: "Connect with verified tutors and manage your tuition experience seamlessly.",
    image: findTutorSlide1,
    primary: "/tuitions",
    secondary: "/tutors",
  },
  {
    title: "Learn Smarter with Trusted & Skilled Tutors",
    desc: "Personalized learning plans tailored to your goals and schedule.",
    image: findTutorSlide2,
    primary: "/tutors",
    secondary: "/be-a-tutor",
  },
  {
    title: "Teach, Earn & Grow Your Career",
    desc: "Join as a tutor and start earning by helping students succeed.",
    image: findTutorSlide3,
    primary: "/be-a-tutor",
    secondary: "/dashboard",
  },
];

const Banner = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[75vh] md:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
              <div className="max-w-7xl w-full md:h-100 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center hover:-translate-y-1">
                <div
                  data-aos="fade-right"
                  className="flex flex-col justify-center h-full"
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    {slide.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      to={slide.primary}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition transform"
                    >
                      Get Started
                    </Link>

                    <Link
                      to={slide.secondary}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700
                      text-gray-900 dark:text-gray-200 rounded-lg
                      hover:bg-gray-300 dark:hover:bg-gray-600
                      shadow-md hover:scale-105 transition transform"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                <div
                  data-aos="fade-left"
                  className="hidden md:flex justify-center items-center h-full "
                >
                  <img
                    src={slide.image}
                    alt="Banner Illustration"
                    className="w-72 lg:w-full h-full md:h-70 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NEXT SECTION ARROW */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 animate-bounce">
          <FiChevronDown size={28} className="stroke-2" />
          <FiChevronDown size={28} className="-mt-3 opacity-60 stroke-2" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
