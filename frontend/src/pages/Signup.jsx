// components/SignupPage.jsx
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Select from "../ui/Select";
import TermsModal from "../ui/TermsModal";
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
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTermsChecked) {
      toast.error("Please agree to the Terms and Conditions to proceed.");
      return;
    }
    await signup(email, password, name, role, classroom, prn, confirmPassword, rollNo);
    navigate("/verify-email");
  };

  const handleAgreeToTerms = () => {
    setIsTermsChecked(true);  // Check the checkbox
    setIsModalOpen(false);  // Close the modal
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[550px] p-6"
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
            <div>
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

          <div>
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
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
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
                    onChange={(e) => setClassroom(e.target.value)}
                    options={[
                      { value: "", label: "Select" },
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
            </>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
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
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="terms">
              I agree to the{" "}
              <span
                onClick={() => setIsModalOpen(true)} // Open modal
                className="text-primary hover:underline cursor-pointer"
              >
                Terms and Conditions
              </span>
            </Label>
          </div>

          <Button type="submit" className="w-full mb-4" disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
          </Button>
        </form>

        {/* Terms and Conditions Modal */}
        <TermsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAgree={handleAgreeToTerms}  // Pass the handleAgreeToTerms function
        />
      </Card>
    </div>
  );
}
