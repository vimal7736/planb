import { createClient } from '@supabase/supabase-js';

// These will be loaded from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper types
export type SiteContent = {
  id: string;
  content: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon_svg: string | null;
  display_order: number;
  created_at: string;
};

export type PortfolioImage = {
  id: string;
  image_url: string;
  category: string;
  alt_text: string | null;
  created_at: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  content: string | null;
  created_at: string;
};

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  placement: string;
  description: string;
  reference_image_url: string;
  preferred_date: string;
  preferred_time: string;
  estimated_duration?: number;
  estimated_size?: string;
  status: 'pending' | 'reviewed' | 'completed';
  created_at: string;
}

export interface Review {
  id: string;
  client_name: string;
  rating: number;
  text: string;
  tattoo_style: string;
  created_at: string;
};
