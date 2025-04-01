import { prisma } from '@/prisma';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ResetPasswordForm from '../../../../components/auth/ResetPasswordForm';

export default async function ResetPassword({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  
  
    // Extract the token from the URL parameters
  const { token } = await params;

  // checking if the token exists in the database and select the required things
  const tokenExists = await prisma.user.findFirst({
    where: { resetToken: token },
    select: { email: true, resetTokenExpiry: true },
  });

  if (
    !tokenExists ||
    !tokenExists.resetTokenExpiry ||
    tokenExists.resetTokenExpiry < new Date()
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full mx-auto">
        <Card className="w-96 p-4">
          <CardHeader>
            <CardTitle>Invalid Token</CardTitle>
            <CardDescription>
              The reset token is invalid or has expired.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return <ResetPasswordForm token={token} email={tokenExists.email} />;
}
