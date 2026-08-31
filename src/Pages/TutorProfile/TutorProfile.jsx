import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Star,
  MapPin,
  BookOpen,
  GraduationCap,
  Mail,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";
import { Badge } from "../../Components/UI/Badge";

export default function TutorProfile() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  if (!tutor)
    return (
      <div className="min-h-screen flex justify-center items-center mt-16">
        <p className="text-xl text-muted-foreground">Tutor not found</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-background mt-16">
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    src={tutor.tutor_image}
                    alt={tutor.name}
                    className="w-40 h-40 rounded-2xl object-cover ring-4 ring-primary/10 shadow-xl"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {tutor.name}
                    </h1>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(tutor.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                      <span className="font-bold text-lg">{tutor.rating}</span>
                      <span className="text-muted-foreground">/ 5.0</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-semibold">{tutor.experienceYears}+ Years</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold">{tutor.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Subjects</p>
                        <p className="font-semibold">
                          {tutor.subjectSpecialization?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Specialization:</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjectSpecialization?.map((subject, idx) => (
                        <Badge key={idx} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                  <CardDescription>Professional background and teaching philosophy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {tutor.about}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Technical and teaching skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tutor.skills?.map((skill, index) => (
                      <Badge key={index} className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Tuition Preferences */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tuition Preferences</CardTitle>
                  <CardDescription>Teaching preferences and availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tuition Type */}
                  <div className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tuition Type</p>
                      <p className="font-semibold">{tutor.tuitionPreferences?.tuitionType}</p>
                    </div>
                  </div>

                  {/* Expected Salary */}
                  <div className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Expected Salary</p>
                      <p className="font-semibold">{tutor.tuitionPreferences?.expectedSalary}</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Availability</p>
                      <p className="font-semibold">{tutor.tuitionPreferences?.availability}</p>
                    </div>
                  </div>

                  {/* Preferred Areas */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium text-muted-foreground">Preferred Areas</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tutor.tuitionPreferences?.preferredAreas?.map((area, index) => (
                        <Badge key={index} variant="outline">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="w-full" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Tutor
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
