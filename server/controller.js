//link controller to database file
let dogData = require('./db.json');
let id = 6
//create object of functions to be called
//functions should match the functions that the server will call
module.exports = {
    getAllDogs: (req,res) => {
        res.status(200).send(dogData)
    },
    createDog: (req,res) => {
        console.log(req.body);
        console.log(dogData[1]);
        let newDog = {...req.body, id:id}
        console.log(newDog);
        dogData.push(newDog);
        res.status(200).send(dogData)
        id++
    },
    updateDog: (req,res) => {
        let {id} = req.params;
        let {type} = req.body;
        let index = dogData.findIndex(dogOjb => dogOjb.id === +id);
        if(type === 'plus' && dogData[index].friendly < 5) {
            dogData[index].friendly++;
        } else if (type === 'minus' && dogData[index].friendly > 1) {
            dogData[index].friendly--;
        }
        res.status(200).send(dogData);
    },
    deleteDog: (req,res) => {
        let {id} = req.params;
        let index = dogData.findIndex(dogObj => dogObj.id === +id);
        dogData.splice(index,1);
        res.status(200).send(dogData);
    },
    checkFriendly: (req,res) => {
        let {rating} = req.query;
        rating = +rating;
        let newDogData =  dogData.filter(dogObj => {
            return dogObj.friendly === rating;
        })
        console.log(newDogData);
        res.status(200).send(newDogData);
    }
}