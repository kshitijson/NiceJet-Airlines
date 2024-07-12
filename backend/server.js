require('dotenv').config({ path: './.env' });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { authUser } = require('./middleware/authenticate');
const { signup } = require('./Auth/signup')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// For registering new Users
app.post('/api/signup', async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const result = await signup(username, email, password);

    if (result === 0) {
        res.send({
            status: true,
            message: "Registered Successfully"
        })
    }
    else if (result === -1) {
        res.send({
            status: false,
            message: "User already Exists"
        })
    }
    else {
        res.send({
            status: false,
            message: "Internal Server Error"
        })
    }

})



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