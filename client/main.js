const dogsContainer = document.querySelector('#dogs-container');
const dogForm = document.querySelector('#newDogForm');
const friendlyFilter = document.querySelector('#filterForm')

let baseURL = "http://localhost:4000/api/dogs"

const dogsCallback = ({ data: dogs }) => displayDogs(dogs)
const errCallback = err => console.log(err.response.data);

const getAllDogs = () => axios.get(baseURL).then(dogsCallback).catch(errCallback);
const createDog  = body => axios.post(baseURL, body).then(dogsCallback).catch(errCallback);
const updateDog = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(dogsCallback).catch(errCallback);
const deleteDog = (id) => axios.delete(`${baseURL}/${id}`).then(dogsCallback).catch(errCallback);
const checkFriendly = (rating) => axios.get(`${baseURL}/rating?age=${rating}`)


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
}

//Function to take in filter form and direct the data
const filterHandler = event => {
    event.preventDefault();

    let filter = document.querySelector('#filter')

    checkFriendly(filter.value);

    filter.value = 1;
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
}

dogForm.addEventListener('submit', submitHandler);
friendlyFilter.addEventListener('submit', submitHandler);

getAllDogs();