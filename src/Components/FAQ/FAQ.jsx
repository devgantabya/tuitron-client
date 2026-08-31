import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "How can I apply for a tuition?",
    answer:
      "Simply browse our tuition listings, find one that matches your needs, and click the 'Apply' button. You'll fill out a quick application form, and the tutor will review it. You can track all your applications from your personal dashboard.",
  },
  {
    question: "Can I become a tutor on Tuitron?",
    answer:
      "Absolutely! Click on 'Become a Tutor' in the navigation menu and complete our simple registration form. Once our team verifies your credentials, you'll be approved to post tuitions and start teaching. It usually takes 24-48 hours.",
  },
  {
    question: "Is there any fee for using the platform?",
    answer:
      "Browsing tuitions and applying as a student is completely free! For tutors, we charge a small platform fee only after you successfully connect with students and start teaching. No hidden costs or upfront fees.",
  },
  {
    question: "How do I contact a tutor?",
    answer:
      "Once you're logged in, you can message tutors directly through their profile page. All communications are secure, encrypted, and logged in your dashboard for your convenience and safety.",
  },
  {
    question: "What subjects and levels do you cover?",
    answer:
      "We cover all major subjects from elementary to university level, including mathematics, science, languages, computer science, business, and more. You can use our advanced filters to find exactly what you need.",
  },
  {
    question: "How are tutors verified?",
    answer:
      "Every tutor goes through a thorough verification process including ID verification, qualification checks, and background screening. We also collect student reviews and ratings to maintain quality standards.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium border">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">Frequently Asked </span>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about using Tuitron
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left focus:outline-none group"
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-muted-foreground">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
