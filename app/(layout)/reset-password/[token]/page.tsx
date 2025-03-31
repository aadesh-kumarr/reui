import { Card, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { prisma } from "@/prisma";
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPassword({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params; // ✅ Await the params to resolve the promise

    const tokenExists = await prisma.user.findFirst({
        where: { resetToken: token },
        select: { email: true, resetTokenExpiry: true },
    });

    if (!tokenExists || !tokenExists.resetTokenExpiry || tokenExists.resetTokenExpiry < new Date()) {
        return (
            <div className="flex flex-col items-center justify-center h-full mx-auto">
                <Card className="w-96 p-4">
                    <CardHeader>
                        <CardTitle>Invalid Token</CardTitle>
                        <CardDescription>The reset token is invalid or has expired.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return <ResetPasswordForm token={token} email={tokenExists.email} />;
}
