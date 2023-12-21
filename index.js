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

// Yeni bir endpoint ekleyin, sunucuya proxy yapacak
app.get('/proxy/:tc', async (req, res) => {
  const tc = req.params.tc;
  try {
    // Sunucuya proxy yaparak isteği gerçekleştirin
    const response = await axios.get(`http://185.231.68.29/apiservice/aligollez/tc.php?auth=aligollezxd&tc=${tc}`);
    res.json(response.data); // Sunucudan gelen yanıtı istemciye gönderin
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
