"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '../ui/button';

export default function Navbar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'User';
  const userInitials = userName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="">
      <nav className="flex md:px-10 items-center w-full bg-gray-800 text-white p-4 justify-between flex-row text-center">
        {/* dropdown and avatar */}
        {session && (
          <div className="w-fit outline-none">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session?.user?.image || ''} alt={userName} />
                  <AvatarFallback className="text-black">{userInitials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit text-center">
                <Button variant={'destructive'} onClick={() => signOut({ redirectTo: '/' })}>
                  Sign Out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <strong className="text-lg  mx-auto">
          User Management For CIS IT SOLUTIONS
        </strong>
      </nav>
    </div>
  );
}
