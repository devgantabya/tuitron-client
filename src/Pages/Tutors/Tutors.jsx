import { Star, MapPin, GraduationCap, Search, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Button } from "../../Components/UI/Button";
import { Badge } from "../../Components/UI/Badge";

export default function Tutors() {
  const [search, setSearch] = useState("");
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/tutors")
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const query = search.toLowerCase();

  const filtered = tutors.filter(
    (t) =>
      t.name?.toLowerCase().includes(query) ||
      t.subjectSpecialization?.join(" ").toLowerCase().includes(query)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background mt-16">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Find Expert Tutors
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with qualified tutors who can help you achieve your learning goals
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or subject (e.g., Mathematics, Physics, Programming...)"
                className="border-0 focus-visible:ring-0 text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{tutors.length}</h3>
                <p className="text-muted-foreground">Expert Tutors</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">
                  {tutors.length > 0
                    ? (
                        tutors.reduce((acc, t) => acc + (t.rating || 0), 0) /
                        tutors.length
                      ).toFixed(1)
                    : "0"}
                </h3>
                <p className="text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">
                  {tutors.length > 0
                    ? Math.round(
                        tutors.reduce(
                          (acc, t) => acc + (t.experienceYears || 0),
                          0
                        ) / tutors.length
                      )
                    : "0"}
                </h3>
                <p className="text-muted-foreground">Avg. Experience (Years)</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Results Count */}
        {search && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filtered.length}</span> tutor
              {filtered.length !== 1 ? "s" : ""} matching "{search}"
            </p>
          </div>
        )}

        {/* No Results */}
        {filtered.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
              <p className="text-muted-foreground">
                {search
                  ? "Try searching with different keywords"
                  : "No tutors available at the moment"}
              </p>
            </div>
          </Card>
        )}

        {/* Tutors Grid */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((tutor) => (
              <Card
                key={tutor._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Tutor Header */}
                  <div className="flex gap-4 mb-4">
                    <img
                      src={tutor.tutor_image}
                      alt={tutor.name}
                      className="w-20 h-20 object-cover rounded-xl ring-2 ring-primary/10"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        {tutor.name}
                      </h2>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-foreground">
                          {tutor.rating}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          ({tutor.experienceYears} years exp)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Specialization:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjectSpecialization?.map((subject, idx) => (
                        <Badge key={idx} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{tutor.location}</span>
                  </div>

                  {/* View Profile Button */}
                  <Button asChild className="w-full" size="lg">
                    <Link to={`/tutors/${tutor._id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
