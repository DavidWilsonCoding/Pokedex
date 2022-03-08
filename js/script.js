// Declares global scope vairable and initializes to IIFE to create cope of pokemonList 
let pokemonRepository = (function(){
    
    let pokemonList = [];

    //declare variable to hold URL of Pokemon API 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    //add Pokemon to pokemonList
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    //return all pokemon to pokemonRespoitory
    function getAll() {
        return pokemonList;
    }

    //add an event listener which fires on a click event for pokemon buttons
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

    //logs pokemon name to the console
    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList
    };
    
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});