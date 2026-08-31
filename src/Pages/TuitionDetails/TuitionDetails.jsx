import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Users,
  MapPin,
  GraduationCap,
  FileText,
  Mail,
  ArrowRight,
} from "lucide-react";
import useRole from "./../../hooks/useRole";
import ApplyModal from "../../Components/ApplyModal/ApplyModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";
import { Badge } from "../../Components/UI/Badge";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [tuition, setTuition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const { role, isLoading: roleLoading } = useRole();

  useEffect(() => {
    let isMounted = true;

    const fetchTuition = async () => {
      try {
        const { data } = await axiosSecure.get(`/tuitions/${id}`);
        if (isMounted) setTuition(data);
      } catch (error) {
        console.error("Failed to fetch tuition:", error);
        if (isMounted) setTuition(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTuition();
    return () => (isMounted = false);
  }, [id, axiosSecure]);

  if (roleLoading || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tuition)
    return (
      <div className="min-h-screen flex justify-center items-center mt-16">
        <p className="text-xl text-muted-foreground">Tuition not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background mt-16 py-24 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Tuition Details
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete information about this tuition opportunity
          </p>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Core details about the tuition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem icon={<BookOpen />} label="Category" value={tuition.category} />
              <InfoItem icon={<GraduationCap />} label="Course" value={tuition.course} />
              <InfoItem icon={<BookOpen />} label="Subject" value={tuition.subject} />
              <InfoItem icon={<Calendar />} label="Days" value={tuition.days} />
              <InfoItem icon={<Clock />} label="Time" value={tuition.time} />
              <InfoItem icon={<Clock />} label="Duration" value={tuition.duration} />
              <InfoItem icon={<FileText />} label="Method" value={tuition.method} />
              <InfoItem 
                icon={<DollarSign />} 
                label="Salary" 
                value={`৳${tuition.salary}`}
                highlight 
              />
              <InfoItem icon={<Users />} label="Students" value={tuition.students} />
              <InfoItem icon={<Users />} label="Gender" value={tuition.gender} />
            </div>
          </CardContent>
        </Card>

        {/* Tutor Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Tutor Requirements
            </CardTitle>
            <CardDescription>Qualifications we're looking for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoItem 
                icon={<BookOpen />} 
                label="Category" 
                value={tuition.requirements?.category} 
              />
              <InfoItem 
                icon={<GraduationCap />} 
                label="Group" 
                value={tuition.requirements?.group} 
              />
              <InfoItem 
                icon={<Users />} 
                label="Gender" 
                value={tuition.requirements?.gender} 
              />
              <InfoItem 
                icon={<Calendar />} 
                label="Hiring From" 
                value={tuition.requirements?.hiring_from} 
              />
            </div>

            {tuition.requirements?.other && (
              <div className="p-4 bg-accent/50 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Other Requirements</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tuition.requirements?.other}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
            <CardDescription>Location and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoItem 
                icon={<MapPin />} 
                label="Country" 
                value={tuition.contact?.country} 
              />
              <InfoItem 
                icon={<MapPin />} 
                label="City" 
                value={tuition.contact?.city} 
              />
              <InfoItem 
                icon={<MapPin />} 
                label="Location" 
                value={tuition.contact?.location} 
              />
            </div>

            {tuition.contact?.address && (
              <div className="p-4 bg-accent/50 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Full Address</p>
                    <p className="text-sm text-muted-foreground">
                      {tuition.contact?.address}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Apply Button */}
        <div className="flex justify-center pt-4">
          {role?.role === "tutor" ? (
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="w-full sm:w-auto px-12"
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              disabled
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto px-12"
            >
              For Tutors Only
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ApplyModal tuition={tuition} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value, highlight }) => (
  <div className="flex items-start gap-3">
    <div className={`p-2 rounded-lg ${highlight ? 'bg-primary/10' : 'bg-accent'}`}>
      <div className={highlight ? 'text-primary' : 'text-muted-foreground'}>
        {icon}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className={`font-semibold ${highlight ? 'text-primary text-lg' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  </div>
);

export default TuitionDetails;
