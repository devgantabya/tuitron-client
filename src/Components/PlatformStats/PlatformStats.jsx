import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, GraduationCap, BookOpen, Award, TrendingUp, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 12000,
    suffix: "+",
    label: "Active Students",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: GraduationCap,
    value: 5000,
    suffix: "+",
    label: "Expert Tutors",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    value: 50000,
    suffix: "+",
    label: "Classes Completed",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    color: "from-amber-500 to-orange-500",
  },
];

const CountUpNumber = ({ end, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const PlatformStats = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 h-72 w-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-72 w-72 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium border">
            <TrendingUp className="h-4 w-4" />
            Growing Every Day
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Platform{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Statistics
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and tutors who trust our platform for quality education
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full bg-card border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    <stat.icon className="h-8 w-8" />
                  </div>

                  {/* Number */}
                  <div>
                    <div className="text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                      <CountUpNumber end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-base text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border shadow-lg">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <span className="text-sm font-medium">
              <span className="font-bold text-foreground">4.9/5</span>{" "}
              <span className="text-muted-foreground">average rating from</span>{" "}
              <span className="font-bold text-foreground">10,000+</span>{" "}
              <span className="text-muted-foreground">reviews</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;
