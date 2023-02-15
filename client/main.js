//call forward needed html components
const dogsContainer = document.querySelector('#dogs-container');
const dogForm = document.querySelector('form');

let baseURL = "http://localhost:4000/dogs"

const dogsCallback = ({ data: dogs}) => displayDogs(dogs)
const errCallback = err => console.log(err.response.data);

const getAllDogs = () => axios.get(baseURL).then(dogsCallback).catch(errCallback);
const createDog  = body => axios.post(baseURL, body).then(dogsCallback).catch(errCallback);
const updateDog = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(dogsCallback).catch(errCallback);
const deleteDog = (id) => axios.delete(`${baseURL}/${id}`).then(dogsCallback).catch(errCallback);

//create functions to handle sending and recieving data
const submitHandler = event => {
    /*
    This will take the form input data and covert it into
    usable object data that will be passed into the create dog
    function
    will need to prevent default submit action
    will need to reset form at end
    */
}

//add event listeners
const createDogCard = dog => {
    const dogCard = document.createElement('div');
    dogCard.classList.add('dogCard');

    dogCard.innerHTML = `<h3 class="name">${dog.name}</h3>
    <h4 class="breed">${dog.breed}</h4>
    <p class="lifespan">Lifespan: ${dog.lifespan}</p>
    <p class="trait">Best Trait: ${dog.trait}</p>
    <div class="btns-container">
        <button onClick="updateRating(${dog.id}, 'minus')">-</button>
        <p class="friendliness">Friendliness:${dog.friendly}</p>
        <button onClick="updateRating(${dog.id}, 'plus')">+</button>
    </div>
    <button onClick="deleteDog(${dog.id})">Delete</button>`

    dogsContainer.appendChild(dogCard);
}

const displayMovies = arr => {
    /*
    This function needs to take in the dogs array from teh server
    and push it onto the web page
    */
}

form.addEventListener('submit', submitHandler)

getAllDogs();