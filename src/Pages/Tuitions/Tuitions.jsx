import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, DollarSign, BookOpen, Search, Filter } from "lucide-react";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Label } from "../../Components/UI/Label";
import { Button } from "../../Components/UI/Button";

export default function Tuitions() {
  const axiosSecure = useAxiosSecure();

  const [allTuitions, setAllTuitions] = useState([]);
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    course: "",
    subject: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [currentPage, setCurrentPage] = useState(1);

  const tuitionsPerPage = 8;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosSecure.get("/tuitions");
        setAllTuitions(res.data || []);
        setTuitions(res.data || []);
      } catch {
        setAllTuitions([]);
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [axiosSecure]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(handler);
  }, [filters]);

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setLoading(true);
        const params = {
          ...debouncedFilters,
          salaryMin: debouncedFilters.salaryMin
            ? Number(debouncedFilters.salaryMin)
            : undefined,
          salaryMax: debouncedFilters.salaryMax
            ? Number(debouncedFilters.salaryMax)
            : undefined,
        };
        const res = await axiosSecure.get("/tuitions", { params });
        setTuitions(res.data || []);
      } catch {
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [axiosSecure, debouncedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const courses = useMemo(
    () => [...new Set(allTuitions.map((t) => t.course).filter(Boolean))],
    [allTuitions]
  );

  const subjects = useMemo(
    () => [...new Set(allTuitions.map((t) => t.subject).filter(Boolean))],
    [allTuitions]
  );

  const indexOfLast = currentPage * tuitionsPerPage;
  const indexOfFirst = indexOfLast - tuitionsPerPage;
  const currentTuitions = tuitions.slice(indexOfFirst, indexOfLast);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

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
            Find Your Perfect Tuition
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse available tuitions by class, subject, location, and budget.
          </p>
        </motion.div>

        {/* Filters Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-12 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Filter Tuitions</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Course Filter */}
              <div className="space-y-2">
                <Label htmlFor="course" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Course
                </Label>
                <select
                  id="course"
                  name="course"
                  value={filters.course}
                  onChange={handleFilterChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Subject
                </Label>
                <select
                  id="subject"
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Min Salary Filter */}
              <div className="space-y-2">
                <Label htmlFor="salaryMin" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Min Salary
                </Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  placeholder="Min"
                  value={filters.salaryMin}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Max Salary Filter */}
              <div className="space-y-2">
                <Label htmlFor="salaryMax" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Max Salary
                </Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  placeholder="Max"
                  value={filters.salaryMax}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Found <span className="font-semibold text-foreground">{tuitions.length}</span> tuition
                {tuitions.length !== 1 ? "s" : ""} matching your criteria
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        {currentTuitions.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tuitions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to find more results
              </p>
            </div>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {currentTuitions.map((item) => (
              <TuitionCard key={item._id} tuition={item} />
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {tuitions.length > tuitionsPerPage && (
          <div className="flex justify-center mt-12 gap-2 flex-wrap">
            {Array.from(
              { length: Math.ceil(tuitions.length / tuitionsPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
