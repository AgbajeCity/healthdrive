-- Add comprehensive districts data for Kenya and Rwanda

-- Insert Kenya regions (counties)
INSERT INTO regions (id, name, country_code) VALUES 
  (gen_random_uuid(), 'Baringo', 'KE'),
  (gen_random_uuid(), 'Bomet', 'KE'),
  (gen_random_uuid(), 'Bungoma', 'KE'),
  (gen_random_uuid(), 'Busia', 'KE'),
  (gen_random_uuid(), 'Elgeyo-Marakwet', 'KE'),
  (gen_random_uuid(), 'Embu', 'KE'),
  (gen_random_uuid(), 'Garissa', 'KE'),
  (gen_random_uuid(), 'Homa Bay', 'KE'),
  (gen_random_uuid(), 'Isiolo', 'KE'),
  (gen_random_uuid(), 'Kajiado', 'KE'),
  (gen_random_uuid(), 'Kakamega', 'KE'),
  (gen_random_uuid(), 'Kericho', 'KE'),
  (gen_random_uuid(), 'Kiambu', 'KE'),
  (gen_random_uuid(), 'Kilifi', 'KE'),
  (gen_random_uuid(), 'Kirinyaga', 'KE'),
  (gen_random_uuid(), 'Kisii', 'KE'),
  (gen_random_uuid(), 'Kisumu', 'KE'),
  (gen_random_uuid(), 'Kitui', 'KE'),
  (gen_random_uuid(), 'Kwale', 'KE'),
  (gen_random_uuid(), 'Laikipia', 'KE'),
  (gen_random_uuid(), 'Lamu', 'KE'),
  (gen_random_uuid(), 'Machakos', 'KE'),
  (gen_random_uuid(), 'Makueni', 'KE'),
  (gen_random_uuid(), 'Mandera', 'KE'),
  (gen_random_uuid(), 'Marsabit', 'KE'),
  (gen_random_uuid(), 'Meru', 'KE'),
  (gen_random_uuid(), 'Migori', 'KE'),
  (gen_random_uuid(), 'Mombasa', 'KE'),
  (gen_random_uuid(), 'Murang''a', 'KE'),
  (gen_random_uuid(), 'Nairobi', 'KE'),
  (gen_random_uuid(), 'Nakuru', 'KE'),
  (gen_random_uuid(), 'Nandi', 'KE'),
  (gen_random_uuid(), 'Narok', 'KE'),
  (gen_random_uuid(), 'Nyamira', 'KE'),
  (gen_random_uuid(), 'Nyandarua', 'KE'),
  (gen_random_uuid(), 'Nyeri', 'KE'),
  (gen_random_uuid(), 'Samburu', 'KE'),
  (gen_random_uuid(), 'Siaya', 'KE'),
  (gen_random_uuid(), 'Taita-Taveta', 'KE'),
  (gen_random_uuid(), 'Tana River', 'KE'),
  (gen_random_uuid(), 'Tharaka-Nithi', 'KE'),
  (gen_random_uuid(), 'Trans Nzoia', 'KE'),
  (gen_random_uuid(), 'Turkana', 'KE'),
  (gen_random_uuid(), 'Uasin Gishu', 'KE'),
  (gen_random_uuid(), 'Vihiga', 'KE'),
  (gen_random_uuid(), 'Wajir', 'KE'),
  (gen_random_uuid(), 'West Pokot', 'KE');

-- Insert Rwanda provinces
INSERT INTO regions (id, name, country_code) VALUES 
  (gen_random_uuid(), 'Kigali City', 'RW'),
  (gen_random_uuid(), 'Eastern Province', 'RW'),
  (gen_random_uuid(), 'Northern Province', 'RW'),
  (gen_random_uuid(), 'Southern Province', 'RW'),
  (gen_random_uuid(), 'Western Province', 'RW');

-- Insert sample districts for Nairobi County, Kenya
INSERT INTO districts (id, name, region_id) 
SELECT gen_random_uuid(), district_name, r.id
FROM (VALUES 
  ('Starehe'),
  ('Kamukunji'),
  ('Embakasi East'),
  ('Embakasi South'),
  ('Embakasi North'),
  ('Embakasi West'),
  ('Embakasi Central'),
  ('Makadara'),
  ('Westlands'),
  ('Dagoretti North'),
  ('Dagoretti South'),
  ('Langata'),
  ('Kibra'),
  ('Roysambu'),
  ('Kasarani'),
  ('Ruaraka'),
  ('Mathare')
) AS districts_data(district_name)
CROSS JOIN regions r
WHERE r.name = 'Nairobi' AND r.country_code = 'KE';

-- Insert sample districts for Kigali City, Rwanda
INSERT INTO districts (id, name, region_id) 
SELECT gen_random_uuid(), district_name, r.id
FROM (VALUES 
  ('Nyarugenge'),
  ('Gasabo'),
  ('Kicukiro')
) AS districts_data(district_name)
CROSS JOIN regions r
WHERE r.name = 'Kigali City' AND r.country_code = 'RW';

-- Insert districts for Eastern Province, Rwanda
INSERT INTO districts (id, name, region_id) 
SELECT gen_random_uuid(), district_name, r.id
FROM (VALUES 
  ('Bugesera'),
  ('Gatsibo'),
  ('Kayonza'),
  ('Kirehe'),
  ('Ngoma'),
  ('Nyagatare'),
  ('Rwamagana')
) AS districts_data(district_name)
CROSS JOIN regions r
WHERE r.name = 'Eastern Province' AND r.country_code = 'RW';

-- Add sample healthcare facilities
INSERT INTO healthcare_facilities (id, name, type, address, phone, latitude, longitude, district_id, services, operating_hours) VALUES
  (gen_random_uuid(), 'Kenyatta National Hospital', 'Hospital', 'Hospital Rd, Nairobi', '+254 20 2726300', -1.2966, 36.8083, 
   (SELECT id FROM districts WHERE name = 'Starehe' LIMIT 1), 
   ARRAY['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'Cardiology'], '24/7'),
  
  (gen_random_uuid(), 'Aga Khan University Hospital', 'Hospital', '3rd Parklands Ave, Nairobi', '+254 20 3662000', -1.2526, 36.8056,
   (SELECT id FROM districts WHERE name = 'Westlands' LIMIT 1),
   ARRAY['Specialized Care', 'Diagnostics', 'Emergency', 'Pharmacy'], '24/7'),
   
  (gen_random_uuid(), 'Nairobi West Health Centre', 'Health Centre', 'Nairobi West, Nairobi', '+254 20 2726301', -1.3066, 36.7983,
   (SELECT id FROM districts WHERE name = 'Langata' LIMIT 1),
   ARRAY['General Practice', 'Vaccination', 'Pharmacy', 'Maternal Health'], '8:00 AM - 6:00 PM'),

  (gen_random_uuid(), 'King Faisal Hospital', 'Hospital', 'KG 544 St, Kigali', '+250 788 123 000', -1.9441, 30.0619,
   (SELECT id FROM districts WHERE name = 'Gasabo' LIMIT 1),
   ARRAY['Emergency', 'Surgery', 'Diagnostics', 'Pharmacy'], '24/7'),
   
  (gen_random_uuid(), 'Kibagabaga Hospital', 'Hospital', 'Gasabo District, Kigali', '+250 788 456 000', -1.9203, 30.1370,
   (SELECT id FROM districts WHERE name = 'Gasabo' LIMIT 1),
   ARRAY['General Medicine', 'Pediatrics', 'Surgery', 'Laboratory'], '24/7');