import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: 'variables.env' });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getUsersData() {
  const { data, error } = await supabase.from('users').select();
  if (error) console.log('query error', error);
  else return data;
}
