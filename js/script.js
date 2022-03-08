// Declares global scope vairable and initializes to IIFE to create cope of pokemonList 
let pokemonRepository = (function(){
    
    let pokemonList = [];

        // Adds Pokemon to pokemonList
        function add(pokemon) {
            pokemonList.push(pokemon);
        }

        // Returns all pokemon to pokemonRespoitory
        function getAll() {
            return pokemonList;
        }

        // Add an event listener which fires on a click event for pokemon buttons
        function addListener(button, pokemon) {
            button.addEventListener("click", function () {
            showDetails(pokemon);
            });
        }

        // Creates a list of pokemon in HTMl buttons and adds to the <ul> in document
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

        //logs pokemon name to the console
        function showDetails(pokemon) {
            console.log(pokemon.name);
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            showDetails: showDetails
        };
    
    })();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});