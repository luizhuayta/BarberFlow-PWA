// Tipos globales de BarberFlow
// Extiende según vayas agregando tablas en Supabase

export type UserRole = 'dueño' | 'barbero'; // 'cliente' lo usaremos más adelante para la app pública

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  description: string | null;
  is_active: boolean;
}

export interface Appointment {
  id: string;
  client_id: string;
  barber_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
}

// Agrega más tipos según avances (Client, Sale, etc.)
