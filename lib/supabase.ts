import { createClient } from '@supabase/supabase-js';

export function getSupabaseBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://example.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'anon-key'
  );
}
