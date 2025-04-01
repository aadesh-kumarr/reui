"use client"
// Removed unused imports
// import { signOut, useSession } from 'next-auth/react'; // Removed
import { signOut } from "next-auth/react";
export default function Navbar() {
  // Removed session-related logic
  // const { data: session } = useSession();
  // const userName = session?.user?.name || 'User';
  // const userInitials = userName
  //   .split(' ')
  //   .map((name) => name[0])
  //   .join('')
  //   .toUpperCase();

  return (
    <div className="">
      <nav className="flex md:px-10 items-center w-full bg-gray-800 text-white p-4 justify-between flex-row text-center">
        {/* Removed session-related dropdown and avatar */}
        <strong className="text-lg mx-auto">
          User Management For CIS IT SOLUTIONS
        </strong>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-500 px-4 py-2 rounded">
          Sign Out
        </button>
      </nav>
    </div>
  );
}
