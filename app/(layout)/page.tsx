"use client"
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SignUp from '@/components/auth/authforms/signup';
import Login from '@/components/auth/authforms/login';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Page() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="container h-full flex items-center justify-center py-5">
      {isSignUp && (
          <Card className="md:w-[400px]">
            <CardContent className="p-5 md:p-10">
              <SignUp />
            </CardContent>
            <CardFooter>
              <div className="mt-4 text-center  mx-auto">
                <p className="text-sm text-gray-600">
                  Already have an account?
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSignUp(false)}
                  className="mt-2 "
                >
                  Switch to Login
                </Button>
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
              <div className="mt-4 text-center  mx-auto">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSignUp(true)}
                  className="mt-2 "
                >
                  Switch to Sign Up
                </Button>
              </div>
            </CardFooter>
          </Card>
      )}
    </div>
  );
}
