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


function retObjArrDetails(objArr, objArrClass, objArrKeys) {
    // declare variable to hold details about each pokemon to be written to HTML document
    let objArrDetails = '';
    //iterates through objArr (array of objects) 
    objArr.forEach(function(objArr, i) {
        objArrKeys.forEach(function(val, j, arr) {
            // Adds span element to objArrDetails to be returned by parent fundtion
            objArrDetails += `<span class="${objArrClass} ${objArrClass}${i} ${objArrClass}__${arr[j]} ${objArrClass}__${arr[j]}--${i}">${objArr[val]} </span>`;
        });
        // Concatenates span element to objArrDetails if specified criterion met
        if (objArr.height > 1.3) {
            objArrDetails = `${objArrDetails}<span class="span class="${objArrClass} ${objArrClass}__comment ${objArrClass}__comment--${i}"> - Wow, that's big!</span>`;
        }
        objArrDetails += `<br>`;
    });
    return objArrDetails;
}

listDetails = retObjArrDetails(pokemonList, "pokemon", ["name", "height"]);
document.write(listDetails);