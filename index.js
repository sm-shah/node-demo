const bodyParser = require('body-parser')

const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send('<h1> NOT FOUND</h1>')
})
app.listen(3000)