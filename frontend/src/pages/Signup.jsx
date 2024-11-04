// components/SignupPage.jsx
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Select from "../ui/Select";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function SignupPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prn, setPrn] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [classroom, setClassroom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, name, role, classroom, prn, confirmPassword, rollNo)
   await signup(email, password, name, role, classroom, prn, confirmPassword, rollNo);
    navigate("/verify-email");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[550px]  p-6"
        footerText="Already have an account?"
        linkText="Login"
        linkHref="/login"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
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
            <div >
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

          </div>

       {/* Two-column layout for Name and Class */}
            
            <div >
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
 

          <div className="grid grid-cols-3 gap-4 mb-4"> {/* Two-column layout for Email, PRN, and Roll No. */}

            <div >
              <Label htmlFor="rollNo">Roll No.</Label>
              <Input
                id="rollNo"
                type="text"
                placeholder="Enter your RollNo."
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
            <div>
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


            <div>
              <Label htmlFor="classroom">Class</Label>
              <Select
                id="classroom"
                value={classroom}
                onChange={(e) => {
                  setClassroom(e.target.value);
              }}
                options={[
                  {value: "", label: "Select"},
                  { value: "FYCM1", label: "FYCM1" },
                  { value: "FYCM2", label: "FYCM2" },
                  { value: "FYCM3", label: "FYCM3" },
                  { value: "FYETC", label: "FYETC" },
                  { value: "FYAIDS", label: "FYAIDS" },
                  { value: "FYACT", label: "FYACT" },
                ]}
                required
              />
            </div>


          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4 relative"> {/* Password Field */}
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

            <div className="mb-4 relative"> {/* Confirm Password Field */}
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
          </div>
          <Button type="submit" className="w-full mb-4" disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
