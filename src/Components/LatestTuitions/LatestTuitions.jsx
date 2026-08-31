import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import TuitionCard from "../TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const SkeletonCard = () => (
  <div className="bg-card border rounded-2xl p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-muted rounded w-3/4" />
    <div className="h-4 bg-muted rounded w-1/2" />
    <div className="h-4 bg-muted rounded w-2/3" />
    <div className="flex gap-2 pt-4">
      <div className="h-10 bg-muted rounded flex-1" />
      <div className="h-10 bg-muted rounded w-20" />
    </div>
  </div>
);

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      try {
        const { data } = await axiosSecure.get("/latest-tuitions");
        if (isMounted) setTuitions(data || []);
      } catch (e) {
        console.error("Failed to fetch latest tuitions:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetch();
    return () => {
      isMounted = false;
    };
  }, [axiosSecure]);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium border">
              <Sparkles className="h-4 w-4" />
              Latest Opportunities
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-foreground">Fresh </span>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tuitions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover the newest tutoring opportunities posted by students seeking expert guidance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button size="lg" variant="outline" asChild className="group">
              <Link to="/tuitions">
                View All Tuitions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : tuitions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="inline-flex p-6 rounded-full bg-muted">
              <Sparkles className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold">No tuitions available yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              New tutoring opportunities will appear here as they're posted by students
            </p>
            <Button asChild className="mt-4">
              <Link to="/tuitions">Explore All Tuitions</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {tuitions.slice(0, 4).map((tuition) => (
              <motion.div key={tuition._id} variants={itemVariants}>
                <Card className="overflow-hidden h-full p-0 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  <TuitionCard tuition={tuition} />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestTuitions;
