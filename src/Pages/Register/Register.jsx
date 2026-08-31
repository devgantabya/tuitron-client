import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User, Phone, Image, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "./../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";
import { Label } from "../../Components/UI/Label";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      setIsSubmitting(true);

      if (!data.photo || data.photo.length === 0) {
        throw new Error("No photo selected");
      }

      const profileImg = data.photo[0];
      await registerUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        phone: data.phone,
      };

      await axiosSecure.post("/users", userInfo);

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      navigate(location.state || "/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists. Please login.");
        navigate("/login");
      } else {
        console.error(error);
        alert(error.message || "Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden mt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-background" />
      <div className="absolute top-20 right-20 h-72 w-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 h-72 w-72 bg-purple-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card border rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Create Account
            </h2>
            <p className="text-muted-foreground">
              Join thousands of students learning with us
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <span className="text-sm text-destructive">Name is required</span>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+880 1234-567890"
                  {...register("phone", { required: true })}
                  className="pl-10"
                />
              </div>
              {errors.phone && (
                <span className="text-sm text-destructive">Phone is required</span>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: true })}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <span className="text-sm text-destructive">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  {...register("password", { 
                    required: true,
                    minLength: 6,
                  })}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <span className="text-sm text-destructive">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-sm text-destructive">Password must be at least 6 characters</span>
              )}
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Profile Photo</Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: true })}
                  className="pl-10 cursor-pointer"
                />
              </div>
              {errors.photo && (
                <span className="text-sm text-destructive">Photo is required</span>
              )}
            </div>

            {/* Register Button */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>By signing up, you agree to our Terms & Privacy Policy</p>
        </div>
      </motion.div>
    </div>
  );
}
