const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());

app.use('/api', api);
app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

