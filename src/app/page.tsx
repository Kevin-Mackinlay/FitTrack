'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard'); // Redirect logged-in users
      }
    };
    fetchUser();
  }, []);

 const signInWithGoogle = async () => {
   const { error } = await supabase.auth.signInWithOAuth({
     provider: 'google',
     options: {
       queryParams: {
         prompt: 'select_account', // ✅ Forces Google to ask for an account
       },
       redirectTo: `${window.location.origin}/dashboard`, // Optional: Redirect after login
     },
   });

   if (error) console.error('Login error:', error);
 };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to FitTrack</h1>
        <p className="text-gray-500 mt-2">Track your fitness and progress easily!</p>

        <button onClick={signInWithGoogle} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
