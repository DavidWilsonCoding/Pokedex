//IIFE to hold pokemonList and return methods to pokemonRepository
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //add pokemon to pokemonList
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //return all pokemon
  function getAll() {
    return pokemonList;
  }

  //create buttons for pokemon
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-primary');
    listpokemon.classList.add('group-list-item');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }

  //load list of pokemon from apiUrl
  function loadList() {
    //return promise when fetching pokemon from api
    return fetch(apiUrl).then(function (response) {
        //convert response to json objects
        return response.json();
    }).then(function (json) {
        //extract name and URL from response
        json.results.forEach(function (item) {
          let pokemon = {
              name: item.name,
              detailsUrl: item.url
          };
          add(pokemon);
        });
        }).catch(function (e) {
          console.error(e);
    });
  }

  //after click on pokemon button,load the data of pokemon from server
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //load pokemon data on button click event
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add details from api to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  //display modal with pokemon details
  function showModal(item) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    let pokemonName = $('<h2>' + item.name + '</h2>');
    let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');
    let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');
    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');
    let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
    pokemonImage.attr('src', item.imageUrl);
    modalTitle.empty();
    modalBody.empty();
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonAbilities);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});