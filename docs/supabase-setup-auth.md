-- ============================================================
-- BarberFlow - Supabase SQL Setup (LUI-15)
-- Ejecuta TODO este script en el SQL Editor de Supabase
-- ============================================================

-- 1. Crear tabla profiles (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'barbero' CHECK (role IN ('dueño', 'barbero')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Trigger para updated_at automático
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 3. Trigger que crea automáticamente un profile cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'barbero'  -- Por defecto todos entran como barbero
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Políticas RLS básicas

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Los usuarios pueden actualizar solo su propio perfil (excepto el rol)
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- El dueño puede ver TODOS los perfiles (para gestión)
CREATE POLICY "Dueño can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'dueño'
    )
  );

-- El dueño puede actualizar roles de otros usuarios
CREATE POLICY "Dueño can update any profile"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'dueño'
    )
  );

-- 6. (Opcional pero útil) Vista para obtener el rol actual fácilmente
CREATE OR REPLACE VIEW public.current_user_profile AS
SELECT * FROM public.profiles WHERE id = auth.uid();

-- ============================================================
-- INSTRUCCIONES DE USO:
--
-- 1. Copia y pega TODO este script en Supabase → SQL Editor → Run
-- 2. Ve a Authentication → Providers → Email → Activa "Email" + desactiva confirmación
--    (para desarrollo rápido)
-- 3. Crea dos usuarios desde la app (/signup):
--    - uno que será "barbero"
--    - otro que será "dueño"
-- 4. En Supabase → Table Editor → profiles, cambia manualmente el rol del segundo a 'dueño'
-- 5. Listo. El middleware + RLS ya respetan los roles.
--
-- NOTA: Más adelante (Sprint 2+) moveremos la asignación de roles a una UI de admin.
-- ============================================================

-- ============================================================
-- PRODUCCIÓN CON SUPABASE CLOUD (Recomendado)
-- ============================================================
--
-- Para producción NO uses Postgres dentro de Docker.
--
-- Recomendación actual:
--   - App Next.js → Docker (o plataforma como Railway/Fly.io)
--   - Base de datos + Auth → Supabase Cloud (gratis hasta cierto uso)
--
-- Ventajas:
--   - Más fácil de mantener
--   - Backups automáticos
--   - Auth + Storage ya incluidos
--   - Row Level Security potente
--
-- Si en el futuro quieres todo 100% self-hosted, podemos agregar
-- los contenedores oficiales de Supabase al docker-compose.prod.yml.
--
-- Por ahora: Supabase Cloud + tu app en Docker = Mejor opción para empezar.
-- ============================================================
