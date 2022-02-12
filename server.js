const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/userRouter');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', mainRouter);

app.listen(port, () => {
  console.log(`App port ${port}`);
});