const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const {readdirSync} = require("fs")
app.use(express.json());

app.use(express.static('public'));


readdirSync("./routes").map((file)=>app.use("/",require("./routes/"+file)))

 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

 app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
