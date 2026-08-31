import React from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../UI/Button";

const steps = [
  {
    number: "01",
    title: "Search & Discover",
    desc: "Browse through thousands of verified tutors and tuition posts. Use our smart filters to find exactly what you need.",
    icon: Search,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    number: "02",
    title: "Select & Compare",
    desc: "Review profiles, check ratings, and compare options. Pick the perfect match for your learning goals and schedule.",
    icon: UserCheck,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Connect & Learn",
    desc: "Reach out instantly, schedule your first session, and start your learning journey with zero hassle.",
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const HowItWorks = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background" />
      <div className="absolute top-0 right-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-purple-500/10 rounded-full blur-3xl" />

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
            <Zap className="h-4 w-4" />
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">How It </span>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start your learning journey in three simple steps. It's fast, easy, and designed for your success.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connecting line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}

              {/* Card */}
              <div className="relative bg-card border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-10 w-10" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild className="group">
              <Link to="/tutors">
                Find a Tutor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/be-a-tutor">Become a Tutor</Link>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">12,000+</span> students already learning with us
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
