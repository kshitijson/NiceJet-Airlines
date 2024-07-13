require('dotenv').config({ path: './.env' });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const auth = require('./routes/auth')
const { authUser } = require('./middleware/authenticate');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// for registration and login
app.use('/api', auth)


const startServer = async () => {
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
}

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connection successful")
        return startServer()
    })
    .catch((error) => {
        console.log(error)
    })