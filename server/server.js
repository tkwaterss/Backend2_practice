const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const {
    getAllDogs,
    createDog,
    updateDog,
    deleteDog
} = require('./controller');

app.get("/api/dogs", getAllDogs)
app.post("/api/dogs", createDog)
app.put("/api/dogs/:id", updateDog)
app.delete("/api/dogs/:id", deleteDog)

app.listen(4000, console.log("Server running on 4000"));