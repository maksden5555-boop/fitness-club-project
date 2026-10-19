CREATE TABLE trainings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT
);

CREATE TABLE trainers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT,
  experience_years INT,
  photo TEXT
);

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price INT NOT NULL,
  features TEXT[],
  is_popular BOOLEAN DEFAULT false
);

CREATE TABLE leads (          -- заявки из форм
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT,                -- 'start' или 'trial'
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO trainers (name, specialty, experience_years) VALUES
('Александр', 'Пауэрлифтинг', 8),
('Елена', 'Функциональный тренинг', 6),
('Дмитрий', 'Единоборства', 10);

INSERT INTO trainings (title, description) VALUES
('Силовой тренинг', 'Свободные веса, силовые рамы и оборудование мирового класса.'),
('Функциональный зал', 'Пространство для скорости, выносливости и взрывной силы.'),
('Единоборства', 'Ринг, мешки и тренеры, которые ставят технику с первого удара.');