import { Card,CardContent,CardDescription,CardTitle,CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function ResetPass(){
    return (
        <div className="flex flex-col items-center justify-center h-full mx-auto">
            <Card className="w-96 p-4">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your email to reset your password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Input
                            type="email"
                            placeholder="Email"
                            className="mb-4"
                        />
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}