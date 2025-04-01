"use client"
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SignUp from '@/components/auth/authforms/signup';
import Login from '@/components/auth/authforms/login';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Page() {
  const [isSignUp, setIsSignUp] = useState(true);


  const ResetPass = async () => {
    const email = prompt("Please enter your email address to reset password:");
    if (email) {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        alert('Password reset link sent to your email!');
      } else {
        alert('Error sending password reset link. Please try again.');
      }
    } else {
      alert('Email is required!');
    }
  }
  return (
    <div className="container h-full flex items-center justify-center py-5">
      {isSignUp && (
          <Card className="md:w-[400px]">
            <CardContent className="p-5 md:p-10">
              <SignUp />
            </CardContent>
            <CardFooter>
              <div className="mt-4 text-center mx-auto">
                <p className="text-sm text-gray-600">
                  Already have an account?
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSignUp(false)}
                  className="mt-2"
                >
                  Switch to Login
                </Button>
                <div onClick={ResetPass}  className="block mt-2 text-sm mx-auto text-center text-blue-600">
                  Forget password?
                </div>
              </div>
            </CardFooter>
          </Card>
      )}
      {!isSignUp && (
          <Card className="md:w-[400px]">
            <CardContent className="p-5 md:p-10">
              <Login />
            </CardContent>
            <CardFooter>
              <div className="m-4 text-center mx-auto ">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSignUp(true)}
                  className="mt-2"
                >
                  Switch to Sign Up
                </Button>
                <div onClick={ResetPass} className="mx-auto text-center block mt-2 text-sm text-blue-600">
                  Forget password?
                </div>
              </div>
            </CardFooter>
          </Card>
      )}
    </div>
  );
}
