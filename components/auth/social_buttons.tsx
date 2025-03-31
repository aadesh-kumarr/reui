'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export function Selectors() {
  const handleSocialSignIn = async (provider: string) => {
    const result = await signIn(provider, { redirect: false });
    if (result?.error) {
      console.error('Social sign-in failed:', result.error);
    } else {
      redirect("/home");
    }
  };

  return (
    <div className='space-x-5'>
      <Button variant={'outline'} onClick={() => handleSocialSignIn('google')}>
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
          />
      </Button>
      <Button variant={'outline'} onClick={() => handleSocialSignIn('github')}>
        <Image
          src="/github.svg"
          alt="Github"
          width={20}
          height={20}
          />
      </Button>
    </div>
  );
}



