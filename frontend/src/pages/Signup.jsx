// components/SignupPage.jsx
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Select from "../ui/Select";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader} from "lucide-react";
export default function SignupPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prn, setPrn] = useState("");
  const [classroom, setclassroom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [error, setError] = useState("");

  const { signup,error,isLoading } = useAuthStore();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {


    e.preventDefault();
    // setError("");

    // if (!name || !email || !password || !confirmPassword || (role === "student" && (!prn || !classroom))) {
    //   setError("Please fill out all required fields.");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }
    
      await signup(email, password, name,  role, classroom, prn ,confirmPassword);
      navigate("/verify-email");
    

    console.log("Signed up with:", { role, name, email, prn, classroom, password });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card
        className="w-[400px]"
        footerText="Already have an account?"
        linkText="Log in"
        linkHref="/login">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}

          <div className="mb-4">
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher" },
              ]}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {role === "student" && (
            <>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="prn">PRN</Label>
                  <Input
                    id="prn"
                    type="text"
                    placeholder="Enter your PRN"
                    value={prn}
                    onChange={(e) => setPrn(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="classroom">Class</Label>
                  <Input
                    id="classroom"
                    type="text"
                    placeholder="Enter your class"
                    value={classroom}
                    onChange={(e) => setclassroom(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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

          <Button type="submit" className="w-full mb-4" disabled={isLoading}>
          {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
