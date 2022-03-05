// Declares global scope vairable and initializes to IIFE to create cope of pokemonList 
let pokemonRepository = (function(){
    
    let pokemonList = [
        {
            name: "Chameleon",
            height: 1.1,
            types: ["blaze", "solar power"]
        },
        {
            name: "Wartortle",
            height: 1,
            types: ["rain-dish", "torrent"]
        },
        {
            name: "Pidgeotto",
            height: 1.6,
            types: ["keen-eye", "tangled-feet", "big-pecks"]
        }

        ];

        // Adds Pokemon to pokemonList
        function add(pokemon) {
            pokemonList.push(pokemon);
        }
        // Returns all pokemon to pokemonRespoitory
        function getAll() {
            return pokemonList;
        }

        // Creates a list of pokemon in buttons
        function addListItem(pokemon) {
            let pokemonUl = document.querySelector(".pokemon-list");
            let listPokemon = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add("pokemon-button");
            listPokemon.appendChild(button);
            pokemonUl.appendChild(listPokemon);
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem
        };
    
    })();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

listDetails = retObjArrDetails(pokemonRepository.getAll(), "pokemon", ["name", "height"]);
document.write(listDetails);