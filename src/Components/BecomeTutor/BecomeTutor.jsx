import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, DollarSign, Clock, Users } from "lucide-react";
import { Button } from "../UI/Button";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Well",
    value: "$50+/hour",
  },
  {
    icon: Clock,
    title: "Flexible",
    value: "Your Schedule",
  },
  {
    icon: Users,
    title: "Impact",
    value: "1000s of Students",
  },
];

const BecomeTutor = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background with softer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-purple-600/90 to-purple-700/90" />
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 h-96 w-96 bg-white/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-white/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern overlay - more visible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex p-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <GraduationCap className="h-16 w-16 text-white" />
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Become a Tutor
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Share your knowledge, inspire students, and build a rewarding teaching career on your terms
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto py-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
              >
                <benefit.icon className="h-8 w-8 mb-3 mx-auto" />
                <div className="text-3xl font-bold mb-1">{benefit.value}</div>
                <div className="text-sm text-white/80">{benefit.title}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-primary text-primary text-lg px-8 py-6 h-auto group shadow-2xl font-bold"
            >
              <Link to="/be-a-tutor">
                Start Teaching Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-6 h-auto font-semibold"
            >
              <Link to="/tutors">See Tutor Profiles</Link>
            </Button>
          </motion.div>

          {/* Small text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-white/70 text-sm"
          >
            Join <span className="font-semibold text-white">5,000+</span> tutors already teaching on our platform
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeTutor;
