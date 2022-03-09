// Declares global scope vairable and initializes to IIFE to create cope of pokemonList 
let pokemonRepository = (function(){
    
    let pokemonList = [];

    //declare variable to hold URL of Pokemon API 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    //add Pokemon to pokemonList
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    //initiates and displays modal when called
    function showModal(title, text) {
        let modalContainer = document.querySelector('#modal-container');
        //clears previous modal content
        modalContainer.innerHTML = '';
        //add div to contain modal content
        let modal = document.createElement('div');
        modal.classList.add('modal');
        //add close modal button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //add modal title
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        //add modal content
        let contentElement = document.createElement('p');
        contentElement.innerText = text;
        //append close button, title and text elements to modal element
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        //append modal element to modal container
        modalContainer.appendChild(modal);
        //add the css class to display the modal
        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal Title', 'This is the text for the modal');
    });

    //return all pokemon to pokemonRespoitory
    function getAll() {
        return pokemonList;
    }

    //provides pokemon details when pokemon button clicked
    function addListener(button, pokemon) {
        button.addEventListener("click", function () {
        showDetails(pokemon);
        });
    }

    //creates a list of pokemon in HTML buttons and adds to the <ul> in document
    function addListItem(pokemon) {
        let pokemonUl = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        listPokemon.appendChild(button);
        pokemonUl.appendChild(listPokemon);
        addListener(button, pokemon);
    }

    //loads pokemon from pokemon api
    function loadList() {
        //get list of pokemon from apiUrl
        return fetch(apiUrl).then(function (response) {
            //convert response to json objects
            return response.json();
        }).then(function (json) {
            //forEach loop to convert json objects to js objects, adding  key value pairs for pokemon name and details URL 
            json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            //call add function to push pokemon to pokemonList
            add(pokemon);
        });
        //error handling
        }).catch(function (e) {
            console.error(e);
        })
    }

    //provide detailed information about each pokemon. (Called by showDetails after button click event).
    function loadDetails(item) {
        let url = item.detailsUrl;
        //get pokemon details from api
        return fetch(url)
        .then(function (response) {
            //converts pokemon details to json object
            return response.json();
        })
        .then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        })
        .catch(function (e) {
            console.error(e);
        });
    }

    //logs pokemon details to the console. (Called by button click event).
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
    
})();

//IIFE private function to populate pokemonList
pokemonRepository.loadList().then(function () {
    //returns pokemonList and renders a button to the HTML document to represent each pokemo in pokemonList by name
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});