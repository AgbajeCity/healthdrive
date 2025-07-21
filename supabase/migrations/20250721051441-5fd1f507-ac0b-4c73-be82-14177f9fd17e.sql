-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  region TEXT,
  district TEXT,
  emergency_contact TEXT,
  medical_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create countries table
CREATE TABLE public.countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create regions table
CREATE TABLE public.regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT NOT NULL REFERENCES public.countries(code),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create districts table
CREATE TABLE public.districts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  region_id UUID NOT NULL REFERENCES public.regions(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create healthcare_facilities table
CREATE TABLE public.healthcare_facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  district_id UUID REFERENCES public.districts(id),
  services TEXT[],
  operating_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healthcare_facilities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Anyone can view regions" ON public.regions FOR SELECT USING (true);
CREATE POLICY "Anyone can view districts" ON public.districts FOR SELECT USING (true);
CREATE POLICY "Anyone can view healthcare facilities" ON public.healthcare_facilities FOR SELECT USING (true);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert countries data
INSERT INTO public.countries (name, code) VALUES
  ('Kenya', 'KE'),
  ('Rwanda', 'RW'),
  ('Nigeria', 'NG'),
  ('Uganda', 'UG'),
  ('Tanzania', 'TZ');

-- Insert Kenya regions and districts
INSERT INTO public.regions (name, country_code) VALUES
  ('Central', 'KE'),
  ('Coast', 'KE'),
  ('Eastern', 'KE'),
  ('Nairobi', 'KE'),
  ('North Eastern', 'KE'),
  ('Nyanza', 'KE'),
  ('Rift Valley', 'KE'),
  ('Western', 'KE');

-- Insert Rwanda provinces and districts
INSERT INTO public.regions (name, country_code) VALUES
  ('Kigali City', 'RW'),
  ('Southern Province', 'RW'),
  ('Western Province', 'RW'),
  ('Northern Province', 'RW'),
  ('Eastern Province', 'RW');

-- Insert Nigeria states
INSERT INTO public.regions (name, country_code) VALUES
  ('Lagos', 'NG'),
  ('Kano', 'NG'),
  ('Kaduna', 'NG'),
  ('Oyo', 'NG'),
  ('Rivers', 'NG'),
  ('Ogun', 'NG'),
  ('Imo', 'NG'),
  ('Edo', 'NG'),
  ('Enugu', 'NG'),
  ('Delta', 'NG'),
  ('Anambra', 'NG'),
  ('Cross River', 'NG'),
  ('Kwara', 'NG'),
  ('Osun', 'NG'),
  ('Plateau', 'NG'),
  ('Ondo', 'NG'),
  ('Abia', 'NG'),
  ('Sokoto', 'NG'),
  ('Akwa Ibom', 'NG'),
  ('Borno', 'NG'),
  ('Bauchi', 'NG'),
  ('Katsina', 'NG'),
  ('Jigawa', 'NG'),
  ('Adamawa', 'NG'),
  ('Gombe', 'NG'),
  ('Yobe', 'NG'),
  ('Taraba', 'NG'),
  ('Kebbi', 'NG'),
  ('Zamfara', 'NG'),
  ('Niger', 'NG'),
  ('Benue', 'NG'),
  ('Kogi', 'NG'),
  ('Nassarawa', 'NG'),
  ('FCT - Abuja', 'NG'),
  ('Ebonyi', 'NG'),
  ('Ekiti', 'NG'),
  ('Bayelsa', 'NG');

-- Insert Uganda regions
INSERT INTO public.regions (name, country_code) VALUES
  ('Central Region', 'UG'),
  ('Eastern Region', 'UG'),
  ('Northern Region', 'UG'),
  ('Western Region', 'UG');

-- Insert Tanzania regions
INSERT INTO public.regions (name, country_code) VALUES
  ('Arusha', 'TZ'),
  ('Dar es Salaam', 'TZ'),
  ('Dodoma', 'TZ'),
  ('Geita', 'TZ'),
  ('Iringa', 'TZ'),
  ('Kagera', 'TZ'),
  ('Katavi', 'TZ'),
  ('Kigoma', 'TZ'),
  ('Kilimanjaro', 'TZ'),
  ('Lindi', 'TZ'),
  ('Manyara', 'TZ'),
  ('Mara', 'TZ'),
  ('Mbeya', 'TZ'),
  ('Morogoro', 'TZ'),
  ('Mtwara', 'TZ'),
  ('Mwanza', 'TZ'),
  ('Njombe', 'TZ'),
  ('Pemba North', 'TZ'),
  ('Pemba South', 'TZ'),
  ('Pwani', 'TZ'),
  ('Rukwa', 'TZ'),
  ('Ruvuma', 'TZ'),
  ('Shinyanga', 'TZ'),
  ('Simiyu', 'TZ'),
  ('Singida', 'TZ'),
  ('Songwe', 'TZ'),
  ('Tabora', 'TZ'),
  ('Tanga', 'TZ'),
  ('Unguja North', 'TZ'),
  ('Unguja South', 'TZ');