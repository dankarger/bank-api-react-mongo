const express = require('express');
require("dotenv").config();
require("./db/mongoose")
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute')

let publicPath = path.join(__dirname, 'client/build')
if(port===5000){
    publicPath = path.join(__dirname, 'client/public')
}


app.use(cors());
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/users', userRoute)


app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
});


app.listen(port, () => {
    console.log('listening on port ' + port);
});
