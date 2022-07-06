const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const router = require('./router');
const mongoose = require('mongoose');

app.use(express.json());
app.use(router)

mongoose.connect("mongodb+srv://alyzande:password@cluster0.khie2.mongodb.net/?retryWrites=true&w=majority")
app.listen(port, () => 
console.log(`Example app listening at http://localhost:${port}`))

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("database connected")
});

