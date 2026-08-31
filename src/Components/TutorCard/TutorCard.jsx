import { Link } from "react-router";
import { motion } from "framer-motion";
import { GraduationCap, Star, ArrowRight } from "lucide-react";
import { Button } from "../UI/Button";

const TutorCard = ({ tutor }) => {
  const { _id, name, tutor_image, subjectSpecialization = [], rating = 4.8 } = tutor;

  const imageSrc =
    tutor_image?.startsWith("http") || tutor_image?.startsWith("/")
      ? tutor_image
      : "https://i.pravatar.cc/200?img=" + (_id?.slice(-2) || "1");

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div className="relative h-full flex flex-col bg-card border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

        {/* Content */}
        <div className="flex-1 p-6 space-y-4">
          {/* Image and basic info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={imageSrc}
                alt={name}
                onError={(e) => (e.currentTarget.src = "https://i.pravatar.cc/200?img=1")}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
              />
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 border-2 border-card rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-foreground leading-tight truncate group-hover:text-primary transition-colors">
                {name}
              </h4>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-foreground">{rating}</span>
                <span className="text-xs text-muted-foreground">(120+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span className="font-medium">Specializations</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {subjectSpecialization.length ? (
                subjectSpecialization.slice(0, 3).map((subject, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {subject}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No specialization provided</span>
              )}
              {subjectSpecialization.length > 3 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  +{subjectSpecialization.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Button asChild className="w-full group/btn" size="lg">
            <Link to={`/tutors/${_id}`}>
              View Profile
              <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default TutorCard;
