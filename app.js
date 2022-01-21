const express = require('express');
require("dotenv").config();
require("./db/mongoose")
const mongoose = require('mongoose');

//
const cors = require('cors');
const path = require('path');
//
const app = express();
const port = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute')

//
const publicPath = path.join(__dirname, 'client/public');
// const publicPath = path.join(__dirname, 'client/build');
// const URL= process.env.URL_MONGO;




app.use(cors());
app.use(express.static(publicPath));
//
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/users', userRoute)
//
// mongoose.connect(URL,()=> {
//     console.log(URL)
//     console.log('connected');
// })



// app.use('/', go to react)
// })
//
// app.get('/api/users', (req, res) => {
//     try {
//         res.status(200).send({ userName: 'Bob' });
//     } catch (e) {
//         res.status(400).send({ error: e.message });
//     }
// });
//
// //


app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
});


app.listen(port, () => {
    console.log('listening on port ' + port);
});
