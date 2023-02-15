const dogsContainer = document.querySelector('#dogs-container');
const dogForm = document.querySelector('form');

let baseURL = "http://localhost:4000/api/dogs"

const dogsCallback = ({ data: dogs }) => displayDogs(dogs)
const errCallback = err => console.log(err.response.data);

const getAllDogs = () => axios.get(baseURL).then(dogsCallback).catch(errCallback);
const createDog  = body => axios.post(baseURL, body).then(dogsCallback).catch(errCallback);
const updateDog = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(dogsCallback).catch(errCallback);
const deleteDog = (id) => axios.delete(`${baseURL}/${id}`).then(dogsCallback).catch(errCallback);
const checkFriendly = (age) => axios.get(`${baseURL}?age=${age}`)


//create functions to handle sending and recieving data
const submitHandler = event => {
    event.preventDefault();

    let name = document.querySelector('#name');
    let breed = document.querySelector('#breed');
    let trait = document.querySelector('#trait');
    let lifespan = document.querySelector('#lifespan');
    let friendly = document.querySelector('#rating');

    let dogObject = {
        name: name.value,
        breed: breed.value,
        trait: trait.value,
        lifespan: lifespan.value,
        friendly: friendly.value,
    }

    createDog(dogObject);

    name.value = "";
    breed.value = "";
    trait.value = "";
    lifespan.value = "";
    friendly.value = 5;
    
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
    <p class="lifespan">Lifespan: ${dog.lifespan} years</p>
    <p class="trait">Best Trait: ${dog.trait}</p>
    <div class="btns-container">
        <button onClick="updateDog(${dog.id}, 'minus')">-</button>
        <p class="friendliness">Friendliness:${dog.friendly}</p>
        <button onClick="updateDog(${dog.id}, 'plus')">+</button>
    </div>
    <button onClick="deleteDog(${dog.id})">Delete</button>`

    dogsContainer.appendChild(dogCard);
}

const displayDogs = arr => {
    dogsContainer.innerHTML = "";
    for(let i = 0; i < arr.length; i++) {
        createDogCard(arr[i]);
    }
    /*
    This function needs to take in the dogs array from the server
    and push it onto the web page
    */
}

dogForm.addEventListener('submit', submitHandler)

getAllDogs();