'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {  User } from '@supabase/supabase-js';

interface Workout {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}


export default function WorkoutsPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);


//fetch User
useEffect(() => {
  const fetchUser = async () => {
    const {data} = await supabase.auth.getUser();
    setUser(data.user);
  };

  fetchUser();
}, []);

// Fetch Workouts
useEffect(() => {
  if (!user) return; // Only run if user exists
  const fetchWorkouts = async () => {
    const { data, error } = await supabase
      .from('workouts')                 // ← Target table
      .select('*')                      // ← Select all columns
      .eq('user_id', user.id)           // ← Only get workouts from this user
      .order('created_at', { ascending: false });  // ← Sort by date (newest first)

    if (error) console.error('Error fetching workouts:', error);
    else setWorkouts(data as Workout[]);
  };
  fetchWorkouts();
}, [user]);




  // Optional: Future could be turned into a reducer if you want more control
 const addWorkout = async () => {
   if (!user) return;

   setLoading(true);
console.log('Inserting workout:', { user_id: user.id, title, description });
   // Insert workout into Supabase
   const { error } = await supabase.from('workouts').insert([
     {
       user_id: user.id,
       title,
       description,
     },
   ]);

   if (error) {
  alert(`Error adding workout: ${error.message}`);
  console.error('Supabase Error:', JSON.stringify(error, null, 2));


   } else {
     alert('Workout added successfully');
     setTitle('');
     setDescription('');
     // Refresh workouts correctly
     const { data } = await supabase.from('workouts').select('*').eq('user_id', user.id).order('created_at', { ascending: false }); // ✅ FIXED HERE

     setWorkouts(data as Workout[]);
   }
   setLoading(false);
 };

  //Mark as completed
  const toggleCompleted = async (workout: Workout) => {
    const { error } = await supabase.from('workouts').update({ completed: !workout.completed }).eq('id', workout.id);

    if (!error) {
      // Update local state only if update was successful
      setWorkouts((prev) => prev.map((w) => (w.id === workout.id ? { ...w, completed: !workout.completed } : w)));
    } else {
      console.error('Error updating workout:', error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Add Workout</h1>

        <input type="text" placeholder="Workout Title" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Workout Description" className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button onClick={addWorkout} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {loading ? 'Saving...' : 'Add Workout'}
        </button>
      </div>

      {/* Workout List */}
      <div className="max-w-md w-full space-y-2">
        {workouts.length === 0 ? (
          <p className="text-center text-gray-500">No workouts yet.</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className={`flex justify-between items-center bg-white p-3 rounded shadow ${workout.completed ? 'opacity-50' : ''}`}>
              <div>
                <h2 className={`font-bold ${workout.completed ? 'line-through' : ''}`}>{workout.title}</h2>
                <p className="text-sm text-gray-500">{workout.description}</p>
              </div>
              <button onClick={() => toggleCompleted(workout)} className={`text-sm ${workout.completed ? 'text-green-600 hover:text-green-800' : 'text-gray-600 hover:text-black'}`}>
                {workout.completed ? '✓' : 'Mark'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
