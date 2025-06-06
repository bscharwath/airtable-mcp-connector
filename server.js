const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const AIRTABLE_TOKEN = process.env.patWwP5X4VYJtb4u1.201efdd995733b4565b560dd57646109402c4af7c1b973bcc139d0467ded94ca;
const AIRTABLE_BASE_ID = process.env.appXbC6Jkva8sAKw7;

app.use(express.json());

app.get('/schema', async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`
      }
    };
    const response = await axios.get(
      `https://api.airtable.com/v0/meta/bases`,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/records', async (req, res) => {
  const { table, fields } = req.body;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`,
      { fields },
      config
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
