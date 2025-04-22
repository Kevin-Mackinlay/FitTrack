'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-300 shadow-md w-full px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        FitTrack
      </Link>
      <div className="space-x-4">
        <Link href="/dashboard" className="text-gray-700  hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/workouts" className="text-gray-700 hover:text-blue-600">
          Workouts
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
