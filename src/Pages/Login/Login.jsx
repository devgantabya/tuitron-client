import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";
import { Label } from "../../Components/UI/Label";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirect = location.state?.from || "/dashboard";

  const onSubmit = (data) => {
    signInUser(data.email, data.password).then(() =>
      navigate(redirect, { replace: true })
    );
  };

  const demoLogin = () => {
    signInUser("demo@tuitron.com", "Demo@1234").then(() =>
      navigate("/dashboard")
    );
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
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
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
              {errors.password && (
                <span className="text-sm text-destructive">Password is required</span>
              )}
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            {/* Demo Login */}
            <Button
              type="button"
              variant="outline"
              onClick={demoLogin}
              className="w-full"
              size="lg"
            >
              Try Demo Account
            </Button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Trusted by 12,000+ students worldwide</p>
        </div>
      </motion.div>
    </div>
  );
}
