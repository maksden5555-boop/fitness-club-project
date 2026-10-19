require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const trainings = (await db.query('SELECT * FROM trainings ORDER BY id')).rows;
    const plans = (await db.query('SELECT * FROM plans ORDER BY price')).rows;
    res.render('index', { trainings, plans });
  } catch (e) { next(e); }
});

app.get('/trainings', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM trainings ORDER BY id');
    res.render('trainings', { title: 'Тренировки', trainings: rows });
  } catch (e) { next(e); }
});

app.get('/trainers', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM trainers ORDER BY id');
    res.render('trainers', { title: 'Тренеры', trainers: rows });
  } catch (e) { next(e); }
});

app.get('/club', (req, res) => res.render('club', { title: 'Клуб' }));
app.get('/contacts', (req, res) => res.render('contacts', { title: 'Контакты' }));

app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, source } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Заполните поля' });
    await db.query(
      'INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3)',
      [name, phone, source || 'start']
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`));