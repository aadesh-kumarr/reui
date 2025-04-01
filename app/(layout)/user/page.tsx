'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('id');
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      router.push('/home');
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user?id=${userId}`);
        const result = await response.json();

        if (!result || !result.user) {
          console.error('Error: User not found');
          return;
        }

        setUser(result.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>User Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The user you are looking for does not exist.</p>
            <Button variant="outline" onClick={() => router.push('/home')}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={() => router.push('/home')}>
        Back to User List
      </Button>
    </div>
  );
}
