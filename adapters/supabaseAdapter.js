import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: 'variables.env' });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getUsersData() {
  const { data, error } = await supabase.from('users').select();
  if (error) {
    console.error('query error', error);
    throw error;
  }
  return data;
}

export async function getUserIdData(userId) {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId) 
    .single(); 

  if (error) {
    console.error('query error', error);
    throw error;
  }

  return data;
}