import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://yhlhfgwhjszfpyyqijea.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobGhmZ3doanN6ZnB5eXFpamVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExODQ2MjUsImV4cCI6MjAxNjc2MDYyNX0.lGQ_qCAxB5GTmcZulmZpmb3u8QjwqVflrsjtkqLvS98";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
