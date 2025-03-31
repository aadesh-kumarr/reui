import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function handleSignIn(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  
  // Basic validation
  if (!formObject.email || !formObject.password) {
    alert("email and password are required.");
    return;
  }

  const result = await signIn("credentials", { ...formObject, redirect: false });
  if (result?.error) {
    alert("Sign-in failed. Check credentials.");
  } else {
    console.log(result?.status);
    console.log("Sign-in successful:", result);
    // Redirect to home page after successful sign in
    redirect("/home");
  }
}

export async function handleSignUp(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  
  // Basic validation
  if (!formObject.email || !formObject.password) {
    console.log("Form data:", formObject);
    alert("Email and password are required.");
    return;
  }

  const response = await fetch("/api/signin/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formObject),
  });

  if (response.ok) {
    alert("Signup successful. You can now sign in.");
    // After successful signup, sign in the user and redirect to home
    const result = await signIn("credentials", { ...formObject, redirect: false });
    if (result?.error) {
      alert("Auto sign-in failed. Please sign in manually.");
    } else {
      redirect("/home");
    }
  } else {
    alert("Signup failed. Try again.");
  }
}