import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://egztfscmwqbcawsxufeh.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnenRmc2Ntd3FiY2F3c3h1ZmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMDE0NzEsImV4cCI6MjAxNDY3NzQ3MX0.2k89LLH6jYtxCF37Pnyj6_nBkNaiZJwZ0cKY5EIgV0E`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
