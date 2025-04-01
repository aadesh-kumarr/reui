"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordForm({ token, email }: { token: string, email: string }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData(event.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        const response = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password, email }),
        });

        const data = await response.json();
        setMessage(data.message);
        setLoading(false);

        if (response.ok) {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full mx-auto">
            <Card className="w-96 p-4">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Input type="password" name="password" placeholder="Password" className="mb-4" required />
                        <Input type="password" name="confirmPassword" placeholder="Confirm Password" className="mb-4" required />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>
                    {message && <p className="text-red-500 mt-2">{message}</p>}
                </CardContent>
            </Card>
        </div>
    );
}
