'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [data, setData] = useState<null | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('test_table').select('*');
      if (error) console.error('Error fetching data:', error);
      else setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🏋️ FitTrack Home</h1>
        <p className="text-gray-600 mb-6">Welcome to FitTrack! Your ultimate fitness and meal tracking platform.</p>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📋 Data from Supabase:</h2>
          {data ? <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto">{JSON.stringify(data, null, 2)}</pre> : <p className="text-gray-500">Loading data...</p>}
        </div>
      </div>
    </div>
  );
}
