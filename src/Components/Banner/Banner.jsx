import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles, GraduationCap, Users, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import findTutorSlide1 from "../../assets/find the perfect tutor for your learning journey.jpg";
import findTutorSlide2 from "../../assets/learn smarter with trusted and skilled tutors.jpg";
import findTutorSlide3 from "../../assets/teach earn and grow your career.jpg";
import { Button } from "../UI/Button";

const slides = [
  {
    badge: "🎓 Top Rated Platform",
    title: "Find Your Perfect",
    highlight: "Tutor Match",
    description: "Connect with verified, experienced tutors who can help you achieve your academic goals. Personalized learning that fits your schedule.",
    image: findTutorSlide1,
    cta1: { to: "/tuitions", label: "Browse Tuitions" },
    cta2: { to: "/tutors", label: "Find Tutors" },
    stats: [
      { icon: Users, value: "12K+", label: "Active Tutors" },
      { icon: GraduationCap, value: "50K+", label: "Students" },
      { icon: Star, value: "4.9/5", label: "Rating" },
    ],
  },
  {
    badge: "✨ Smart Learning",
    title: "Learn Smarter",
    highlight: "Achieve More",
    description: "Personalized learning plans, flexible scheduling, and expert guidance to help you excel in your studies.",
    image: findTutorSlide2,
    cta1: { to: "/tutors", label: "Explore Tutors" },
    cta2: { to: "/about", label: "Learn More" },
    stats: [
      { icon: TrendingUp, value: "95%", label: "Success Rate" },
      { icon: Users, value: "500+", label: "Subjects" },
      { icon: Sparkles, value: "24/7", label: "Support" },
    ],
  },
  {
    badge: "💼 Start Teaching",
    title: "Teach & Earn",
    highlight: "Grow Your Career",
    description: "Join our community of expert tutors. Share your knowledge, build your reputation, and earn on your own schedule.",
    image: findTutorSlide3,
    cta1: { to: "/be-a-tutor", label: "Become a Tutor" },
    cta2: { to: "/dashboard", label: "Dashboard" },
    stats: [
      { icon: Users, value: "2K+", label: "Earning Tutors" },
      { icon: TrendingUp, value: "$50+", label: "Avg/Hour" },
      { icon: Star, value: "Top", label: "Platform" },
    ],
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const DELAY = 6000;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DELAY) * 100, 100));
    }, 30);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    const timer = setTimeout(next, DELAY);
    return () => clearTimeout(timer);
  }, [current, next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium border border-primary/20"
            >
              {slide.badge}
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-foreground">{slide.title}</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {slide.highlight}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-base px-8 group" asChild>
                <Link to={slide.cta1.to}>
                  {slide.cta1.label}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <Link to={slide.cta2.to}>{slide.cta2.label}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              {slide.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="space-y-2"
                >
                  <stat.icon className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="h-12 w-12 rounded-full bg-card border hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label="Previous"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  onClick={next}
                  className="h-12 w-12 rounded-full bg-card border hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label="Next"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrent(idx);
                      setProgress(0);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === current ? "w-12 bg-primary" : "w-2 bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            key={`img-${current}`}
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden border shadow-2xl bg-card">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-sm opacity-90">Satisfaction Rate</div>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center pulse-glow">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 h-32 w-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};

export default Banner;