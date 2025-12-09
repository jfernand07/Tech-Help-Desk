-- Datos iniciales simples para TechHelpDesk
-- Nota: reemplaza los hashes por bcrypt reales en tu entorno

INSERT INTO usuarios (id, email, password, nombre, rol, activo) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@example.com', '$2b$10$samplehashadmin', 'Admin', 'admin', true),
  ('00000000-0000-0000-0000-000000000002', 'tech@example.com', '$2b$10$samplehashtech', 'Tech User', 'tecnico', true),
  ('00000000-0000-0000-0000-000000000003', 'client@example.com', '$2b$10$samplehashclient', 'Client User', 'cliente', true);

INSERT INTO clientes (id, name, company, contactEmail, usuario_id) VALUES
  ('00000000-0000-0000-0000-000000000004', 'Client User', 'Acme', 'client@example.com', '00000000-0000-0000-0000-000000000003');

INSERT INTO technicians (id, name, specialty, availability, usuario_id) VALUES
  ('00000000-0000-0000-0000-000000000005', 'Tech User', 'Redes', true, '00000000-0000-0000-0000-000000000002');

INSERT INTO categories (id, name, description) VALUES
  ('00000000-0000-0000-0000-000000000006', 'Soporte', 'Soporte general'),
  ('00000000-0000-0000-0000-000000000007', 'Infraestructura', 'Servidores y redes');

INSERT INTO tickets (id, title, description, status, priority, client_id, technician_id, category_id, createdAt, updatedAt) VALUES
  ('00000000-0000-0000-0000-000000000008', 'Login no funciona', 'No puedo acceder al portal', 'OPEN', 'MEDIUM', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000006', NOW(), NOW());
