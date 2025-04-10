const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = 5000;

const API_KEY = process.env.API_KEY;

app.get('/weather', async (req, res) => {
  const { city, lat, lon } = req.query;
  let url = '';

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else {
    return res.status(400).send({ error: 'City or lat/lon required' });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
