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
  const { data, error } = await supabase.from('users').select().eq('id', userId) .single(); 
  if (error) {
    console.error('query error', error);
    throw error;
  }

  return data;
}

export async function getAnimalsByUserId(userId) {
  const { data, error } = await supabase.from('animals') .select('*') .eq('user_id', userId); 
  if (error) {
    console.error('Error fetching animals', error);
    throw error;
  }

  return data;
}

export async function getEventsByUserId(userId) {
  const { data: eventIds, error} = await supabase.from('users-events').select('event_id').eq('user_id', userId);
  if (error) {
    console.error('query error', error);
    throw error;
  }
  const { data: events, error: eventsError } = await supabase.from('events').select('*').in('id', eventIds.map(e => e.event_id));
  if (eventsError) {
    console.error('query error', eventsError);
    throw eventsError;
  }

  return events;
}