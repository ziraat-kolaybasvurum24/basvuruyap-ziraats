 const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const {readdirSync} = require("fs")
app.use(express.json());

app.use(express.static('public'));


readdirSync("./routes").map((file)=>app.use("/",require("./routes/"+file)))
 app.get('styles.css', (req, res) => {
  res.sendFile(__dirname + '/public/styles.css');
});


 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/import', (req, res) => {
  res.sendFile(__dirname + '/public/import.html');
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
 app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
