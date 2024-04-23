import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rpkixlrdqppbbvrycclg.supabase.co";
const KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwa2l4bHJkcXBwYmJ2cnljY2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1Mjg4NjgsImV4cCI6MjAyOTEwNDg2OH0.lUw4qcYYAPJLPFT4GC2XoVhv5FWWQPwdtdKHQLYIl_I`;
const supabaseKey = KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
