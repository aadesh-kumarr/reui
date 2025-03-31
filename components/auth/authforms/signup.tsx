'use client';

import { handleSignUp } from '../authactions';
import { Selectors } from '../social_buttons';

export default function SignUp() {
  return (
    <div className="">
      <h1 className="font-semibold text-2xl mb-5 text-center">Signup</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('form submitted', new FormData(e.currentTarget)); // Debugging line
          handleSignUp(new FormData(e.currentTarget));
        }}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email" // Added name attribute
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
            name="password" // Added name attribute
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary"
        >
          Signup
        </button>
      </form>
      <div className="text-sm  mt-8 flex flex-row justify-center">
        <Selectors />
      </div>
    </div>
  );
}
