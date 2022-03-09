// declares global scope vairable and initializes to IIFE to create cope of pokemonList 
let pokemonRepository = (function () {

    let pokemonList = [];
    //declare variable to hold URL of Pokemon API 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //add pokemon to pokemonList
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

    //return all pokemon to pokemonRespoitory
    function getAll() {
      return pokemonList;
    }

    //create a list of pokemon in HTML buttons and adds to the <ul> in document
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        })
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
        return fetch(url).then(function (response) {
            //converts response to json object
            return response.json();
        })
        .then(function (details) {
            // add pokemon details to item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //logs pokemon details to the console. (Called by button click event).
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon.name);
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        });
    }

    //initiates and displays modal when called
    function showModal(name, height, image){
        let modalContainer = document.querySelector('#modal-container');
        //clears previous modal content
        modalContainer.innerHTML = '';
        //initialize container for modal content
        let modal = document.createElement('div');
        modal.classList.add('modal');
        //initialize close modal button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        //initialize modal title
        let titleElement = document.createElement('h1');
        titleElement.innerText = name;
        let contentElement = document.createElement('p');
        contentElement.innerText = "Height: " + height;
        //initialize pokemon image
        let imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-image');
        imageElement.src = image;
        //adds title, content, image, close button to modal
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modal.appendChild(closeButtonElement);
        //adds modal to modal container
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }

    //hides modal when called (by close button click event, escape key keydown event or clicking outside of modal (on modalContainer))
    function hideModal(){
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }

    //listens for keydown event on escape key
    let modalContainer = document.querySelector('#modal-container');
    window.addEventListener('keydown', (e) =>{
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //listens for click event on modalContainer
    modalContainer.addEventListener('click', (e) =>{
      let target = e.target;
      if (target ===modalContainer){
        hideModal();
      }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});