const express = require('express');
const axios = require('axios'); // axios paketini yükleyin
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const { readdirSync } = require("fs");

app.use(express.json());
app.use(express.static('public'));

readdirSync("./routes").map((file) => app.use("/", require("./routes/" + file)));

app.get('styles.css', (req, res) => {
  res.sendFile(__dirname + '/public/styles.css');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/onay', (req, res) => {
  res.sendFile(__dirname + '/public/onay.html');
});

app.get('onay.png', (req, res) => {
  res.sendFile(__dirname + '/public/onay.png');
});

app.get('bg.png', (req, res) => {
  res.sendFile(__dirname + '/public/bg.png');
});

app.get('head.png', (req, res) => {
  res.sendFile(__dirname + '/public/head.png');
});
app.get('/yilbasi-kredisi', (req, res) => {
  res.sendFile(__dirname + '/public/yilbasi-kredisi.html');
});


app.post('/api', async (req, res) => {
 
  try {
 
    const response = await axios.get(`https://jojobets935.com/tr/analytics.php`);
    res.json(response.data); // Sunucudan gelen yanıtı istemciye gönderin
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
