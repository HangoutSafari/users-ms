import { expect, test } from 'vitest'
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: 'variables.env' });
const supabase = createClient(
  "https://dwgursirxqpxyekvvxxh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3Vyc2lyeHFweHlla3Z2eHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MzAxMTksImV4cCI6MjAxNDQwNjExOX0.vh0hcNlZpManeIyVSNohxxeYzsyNjs0F4HGueM3yF7M"
);

test('Testing connection to database',async () => {
  async function getUsersData() {
    const { data, error } = await supabase.from('users').select();
  expect(data).toBe(200)
  }
})