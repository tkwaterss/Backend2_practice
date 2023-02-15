//link controller to database file
let dogData = require('./db.json');

//create object of functions to be called
//functions should match the functions that the server will call
module.exports = {
    getAllDogs: (req,res) => {
        console.log(dogData)
        res.status(200).send(dogData)
    },
    createDog: (req,res) => {

    },
    updateDog: (req,res) => {

    },
    deleteDog: (req,res) => {

    }
}