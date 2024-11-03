// components/ResetPasswordPage.jsx
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { resetPassword, isLoading,error } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    setSuccess("");

    // if (!password || !confirmPassword) {
    //   setError("Please fill out all fields.");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }

    // try {
      await resetPassword(token, password,confirmPassword);
      setSuccess("Your password has been reset successfully.");
      toast.success("Password reset successfully, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    // } catch (err) {
    //   setError(err.message || "Error resetting password");
    //   toast.error(err.message || "Error resetting password");
    // }

    useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}

          <div className="mb-4 relative">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-10 right-2 flex items-center"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <div className="mb-4 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
        
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute top-10 right-2 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
