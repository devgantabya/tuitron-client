import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { BookOpen, Calendar, Clock, DollarSign, GraduationCap } from "lucide-react";

const StudentDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTuitions = async () => {
      try {
        const res = await axiosSecure.get("/tuitions", {
          params: { email: user.email },
        });
        setTuitions(res.data);
      } catch (error) {
        console.error("Failed to fetch tuitions", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchTuitions();
  }, [user?.email, axiosSecure]);

  if (loading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          My Tuition Posts
        </h2>
        <p className="text-muted-foreground">
          You have {tuitions.length} active tuition {tuitions.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tuitions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tuitions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tuitions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tuition Cards */}
      {tuitions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tuition posts found</h3>
            <p className="text-muted-foreground text-center">
              Create your first tuition post to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((tuition) => (
            <Card key={tuition._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{tuition.subject}</CardTitle>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Course:</span>
                  <span className="font-medium">{tuition.course}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{tuition.category}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Days:</span>
                  <span className="font-medium">{tuition.days}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{tuition.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm pt-2 border-t border-border">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Salary:</span>
                  <span className="font-bold text-primary">৳{tuition.salary}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
