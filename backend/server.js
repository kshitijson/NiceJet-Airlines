const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { authUser } = require('./middleware/authenticate');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.post('/api/name', authUser, async (req, res) => {

    console.log(req.user)
    res.send("received")

})

app.listen(5000, () => {
    console.log('Server started on port 5000');
});