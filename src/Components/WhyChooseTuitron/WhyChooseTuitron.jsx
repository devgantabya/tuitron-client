import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Laptop, Star, Lock, Award, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Tutors",
    description: "Every tutor goes through rigorous verification to ensure quality and reliability.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Laptop,
    title: "Learn Anywhere",
    description: "Flexible online and offline options. Learn at your pace, on your schedule.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Access highly-rated tutors with proven track records of student success.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description: "Your data and payments are protected with bank-level encryption.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Continuous monitoring and feedback ensure the highest teaching standards.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Instant Connect",
    description: "Quick matching system gets you connected with the right tutor in minutes.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join thousands of successful students in our growing learning community.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "98% of our students report improved grades within 3 months.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const WhyChooseTuitron = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-muted/30">
      {/* Background elements */}
      <div className="absolute top-10 right-10 h-72 w-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 h-72 w-72 bg-purple-500/5 rounded-full blur-3xl" />

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
            <Award className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">What Makes Us </span>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Different
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're not just another platform. We're your partner in educational success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full bg-card border rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Icon with gradient */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          <div className="space-y-1">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              12K+
            </div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="space-y-1">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              5K+
            </div>
            <div className="text-sm text-muted-foreground">Expert Tutors</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="space-y-1">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseTuitron;
