import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { signUserUp, userNotInDb } from "../routes/registration.js";


dotenv.config({ path: 'variables.env' });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getEvent(eventId) {
  const { data, error } = await supabase.from('events').select().eq('id', eventId).single();
  if (error) {
    return null;
    throw error;
  }
  return data;
}

export async function getUsersData() {
  const { data, error } = await supabase.from('users').select();
  if (error) {
    console.error('query error', error);
    throw error;
  }
  return data;
}

export async function getUserIdData(userId) {
  const { data, error } = await supabase.from('users').select().eq('id', userId).single();
  if (error) {
    console.error('query error', error);
    throw error;
  }

  return data;
}

export async function getAnimalsByUserId(userId) {
  const { data, error } = await supabase.from('animals').select('*').eq('user_id', userId);
  if (error) {
    console.error('Error fetching animals', error);
    throw error;
  }
  return data;
}


export async function getFriendsForUser(userId) {
  const { data, error } = await supabase.from('users').select('friends').eq('id', userId).single();
  if (error) {
    return { friends: null }
    throw error;
  }

  return data;
}

export async function getEventsOfUser(userId) {
  const { data, error } = await supabase.from('users-events').select('*').eq('user_id', userId);
  if (error) {
    return { events: null }
    throw error;
  }

  return data;
}


export async function handleUser(userData) {
  const { username, email, password } = userData;
  // userNotInDb(supabase, username);
  try {
    const supabaseResponse = await signUserUp(supabase, email, password, username);
    return supabaseResponse;
  }
  catch (error) {
    console.error('query error', error);
    throw error;
  }

};

export { supabase };

