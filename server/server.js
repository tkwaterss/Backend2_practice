const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const {
//controller functions
} = require('./controller');



//server functions will call functions from controller
//app.get('/api/movies', getMovies);







app.listen(4000, console.log("Server running on 4000"));