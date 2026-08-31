import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Card, CardContent } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";

export default function About() {
  return (
    <div className="relative overflow-hidden mt-16">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-24">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            About Tuitron
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern tuition platform built to connect students with trusted
            tutors — fast, fair, and transparent.
          </p>
        </motion.div>

        {/* MISSION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We aim to create a trusted tuition ecosystem where students easily
              find the right tutors, tutors get fair opportunities, and admins
              manage everything with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground border-0">
              <CardContent className="p-10">
                <h3 className="text-2xl font-semibold mb-6">What We Focus On</h3>
                <ul className="space-y-4">
                  {[
                    "Quality Education",
                    "Smooth Communication",
                    "Fair Opportunities",
                    "Secure Payments",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <FaCheckCircle className="text-white" size={20} />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <FaUserGraduate />,
              value: "5,000+",
              label: "Students Served",
            },
            {
              icon: <FaChalkboardTeacher />,
              value: "1,200+",
              label: "Verified Tutors",
            },
            {
              icon: <FaUsers />,
              value: "10,000+",
              label: "Successful Matches",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-10">
                  <div className="flex justify-center text-5xl text-primary mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-extrabold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground text-lg">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* WHY CHOOSE */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Tuitron?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Verified Tutors",
                text: "Every tutor is reviewed and approved to ensure safety and quality.",
              },
              {
                title: "Smart Matching",
                text: "Advanced filtering based on subject, location, and availability.",
              },
              {
                title: "Easy Communication",
                text: "Built-in tools to communicate directly with tutors.",
              },
              {
                title: "Secure Payments",
                text: "Encrypted and transparent payment system you can trust.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground text-lg">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Join the Tuitron Community
              </h2>
              <p className="mb-8 text-white/90 max-w-2xl mx-auto text-lg">
                Whether you're a student looking for the perfect tutor or a tutor
                seeking new opportunities — Tuitron is for you.
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/tuitions" className="flex items-center gap-2">
                    Find Tuition <FaArrowRight />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30">
                  <Link to="/be-a-tutor">
                    Become a Tutor
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
