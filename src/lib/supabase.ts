import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ctpwvbadzbxcbodqljjw.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImIyYjA2ZjU0LWMwMzItNGEwNi1iYmY3LTU0YmE3YzI4YzhlMiJ9.eyJwcm9qZWN0SWQiOiJjdHB3dmJhZHpieGNib2RxbGpqdyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcyOTc3MDczLCJleHAiOjIwODgzMzcwNzMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.BsVQUkHqIumPFOzmlsV9cZshY81v90ywFqRj5CTosVs';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };