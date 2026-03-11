require('dotenv').config();
const express = require('express');
require("./cron/medicineCron");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProfileRouter = require('./Routes/ProfileRouter'); 
const MedicineRouter = require('./Routes/MedicineRouter');
const cron = require("node-cron");
const Medicine = require("./Models/Medicine");



require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping',(req, res)=>{
    res.send('PONG')
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);
app.use('/medicine',MedicineRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
