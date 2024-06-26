const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

mongoose.connect("mongodb://127.0.0.1:27017/IwantMyMoneyBack",

    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

app.listen(PORT, () => {
    console.log('App listening on port ${PORT}!!!!!!!!');
});    