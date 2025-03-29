import { createClient } from '@supabase/supabase-js';

console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
  const { data, error } = await supabase.from('test_table').select('*');
  if (error) {
    console.error('❌ Supabase Connection Error:', error.message);
  } else {
    console.log('✅ Supabase Data:', data);
  }
})();
