import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function Page() {
  return (
    <div className="container h-full flex items-center justify-center py-5">
      <Card className="md:w-[400px]">
        <CardContent className="p-5 md:p-10">
          <h1 className="font-semibold text-2xl mb-5 text-center">Login</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary"
            >
              Login
            </button>
          </form>
          <div className="text-sm text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
