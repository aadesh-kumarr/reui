'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import Image from 'next/image';
export function Selectors() {
  return (
    <div className='space-x-5'>
      <Button variant={'outline'} onClick={() => signIn('google')}>
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
          />
      </Button>
      <Button variant={'outline'} onClick={() => signIn('github')}>
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



