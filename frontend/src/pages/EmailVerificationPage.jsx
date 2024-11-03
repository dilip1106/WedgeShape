import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import Button from "../ui/Button"; // Assuming you have a Button component
import Input from "../ui/Input"; // Assuming you have an Input component
import Label from "../ui/Label"; // Assuming you have a Label component
import Card from "../ui/Card"; // Assuming you have a Card component
import { useAuthStore } from "../store/authStore"; // Import the auth store
import toast from "react-hot-toast";
export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading } = useAuthStore(); // Destructure the verifyEmail method from the store
  const [verificationCode, setVerificationCode] = useState(""); // State for the verification code

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    await verifyEmail(verificationCode); // Call the verifyEmail method from the store
    navigate('/'); // Redirect to the home page after successful verification
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleResendEmail = async () => {
    // Logic to resend the verification email
    console.log("Resend email clicked");
    // You may want to implement a method in your auth store to handle resending verification emails.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] text-center">
        <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
        <p className="mb-4">
          Please enter the 6-digit verification code sent to your email.
        </p>
        <form onSubmit={handleVerifyCode}>
          <div className="mb-4">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              type="text"
              maxLength="6"
              placeholder="Enter your verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="border rounded p-2 w-full"
              disabled={isLoading} // Disable input when loading
            />
          </div>
          <Button type="submit" className="w-full mb-4" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
        <p className="mb-6">
          If you haven't received the email, click the button below to resend it.
        </p>
        <Button onClick={handleResendEmail} className="w-full mb-4" disabled={isLoading}>
          Resend Verification Email
        </Button>
      </Card>
    </div>
  );
}
