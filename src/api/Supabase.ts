import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://mqqbrcfquzkafpvydnrt.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xcWJyY2ZxdXprYWZwdnlkbnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDg5MDgsImV4cCI6MTk4MzkyNDkwOH0.nRQpqUPNCK47oSL0fv8dqZCXTWNesCO1MuZhkXmiRGg';

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
