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

// declare variable to hold details about each pokemon to be written to HTML document

let pokemonDetails = '';

// forEach method to iterate through pokemon array

pokemonList.forEach(function(pokemon, i) {

    // assign pokemon name and height to pokemonDetails variable

    pokemonDetails = `<span class="pokemon-details pokemon-details__name pokemon-details__name--${i}">${pokemonList[i].name}</span> <span class="pokemon-details pokemon-details__height pokemon-details__height--${i}"> (height: ${pokemonList[i].height})</span>`;

    // concatenate comment to pokemonDetails variable, based on height criterion

    if (pokemonList[i].height > 1.5) {

        pokemonDetails = `${pokemonDetails}<span class="pokemon-details pokemon-details__comment pokemon-details__comment--${i}"> - Wow, that's big!</span>`;

    }

    document.write(`${pokemonDetails}<br>`);
});


