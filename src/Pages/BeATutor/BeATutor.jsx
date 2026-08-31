import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Textarea } from "../../Components/UI/Textarea";
import { Button } from "../../Components/UI/Button";
import { Label } from "../../Components/UI/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/UI/Select";

const BeATutor = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleBeTutor = (data) => {
    const tutorData = {
      name: data.name,
      tutor_email: data.tutor_email,
      tutor_image: data.tutor_image,
      subjectSpecialization: data.subjectSpecialization.split(","),
      experienceYears: Number(data.experienceYears),
      location: `${data.city}, ${data.country}`,
      rating: Number(data.rating || 0),
      about: data.about,
      skills: data.skills.split(","),
      tuitionPreferences: {
        tuitionType: data.tuitionType,
        expectedSalary: data.expectedSalary,
        availability: data.availability,
        preferredAreas: data.preferredAreas.split(","),
      },
    };

    axiosSecure.post("/tutors", tutorData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tutor profile has been submitted. We will review it soon!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen mt-16 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Become a Tutor
          </h1>
          <p className="text-xl text-muted-foreground">
            Join our platform and start teaching students today
          </p>
        </div>

        <form onSubmit={handleSubmit(handleBeTutor)} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    defaultValue={user?.displayName}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutor_email">Email</Label>
                  <Input
                    id="tutor_email"
                    type="email"
                    {...register("tutor_email")}
                    defaultValue={user?.email}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutor_image">Profile Image URL</Label>
                  <Input
                    id="tutor_image"
                    {...register("tutor_image")}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Share your teaching expertise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subjectSpecialization">
                    Subjects (comma-separated)
                  </Label>
                  <Input
                    id="subjectSpecialization"
                    {...register("subjectSpecialization")}
                    placeholder="Math, Programming, Physics"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceYears">Experience (Years)</Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    {...register("experienceYears")}
                    placeholder="4"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (Optional)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    {...register("rating")}
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About Yourself</Label>
                <Textarea
                  id="about"
                  {...register("about")}
                  placeholder="Describe your teaching experience and methodology..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  {...register("skills")}
                  placeholder="HTML, CSS, JavaScript, React"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Tuition Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Tuition Preferences</CardTitle>
              <CardDescription>Set your teaching preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tuitionType">Tuition Type</Label>
                  <select
                    id="tuitionType"
                    {...register("tuitionType")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Online Tuition">Online Tuition</option>
                    <option value="Home Tuition">Home Tuition</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedSalary">Expected Salary</Label>
                  <Input
                    id="expectedSalary"
                    {...register("expectedSalary")}
                    placeholder="10000 - 15000 BDT"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    {...register("availability")}
                    placeholder="4 days/week"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredAreas">
                  Preferred Areas (comma-separated)
                </Label>
                <Input
                  id="preferredAreas"
                  {...register("preferredAreas")}
                  placeholder="Mirpur, Dhanmondi, Online"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
              <CardDescription>Where are you based?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="Dhaka"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register("country")}
                    placeholder="Bangladesh"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full">
            Submit Tutor Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BeATutor;
