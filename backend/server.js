const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/api/name', async (req, res) => {

    res.send("Hello");

})

app.listen(5000, () => {
    console.log('Server started on port 5000');
});