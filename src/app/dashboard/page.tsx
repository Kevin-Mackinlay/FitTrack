'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface UserProfile {
  email?: string; // Email is optional
  full_name: string;
  avatar_url: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.push('/'); // Redirect to home if not logged in
        return;
      }

      const { data: profile, error: profileError } = await supabase.from('profiles').select('full_name, avatar_url').eq('id', data.user.id).single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }

      setUser({
        email: data.user.email || '',
        full_name: profile?.full_name || 'Anonymous',
        avatar_url: profile?.avatar_url || 'https://via.placeholder.com/100',
      });

      setLoading(false);
    };

    fetchUser();
  }, [router]); // Ensure `router` is in the dependency array

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {loading ? (
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        ) : (
          <>
            <img src={user?.avatar_url} alt="User Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border border-gray-300 shadow-sm" />
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.full_name}!</h1>
            <p className="text-gray-500">{user?.email}</p>

            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
