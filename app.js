const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;


const headers = require('./middleware/headers');
require('dotenv').config()

const nftRoutes = require('./routes/nft');




app.use(headers);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/nft', nftRoutes);



app.listen(PORT, () => {
    console.log('connected');
});