const pokemon = document.querySelector('.pokemon');
const btn     = document.querySelector('.btn');


infoPokemon = async (id) => {
    let res  = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    let info = await res.json();
    //console.log(info);
    pokemon.innerHTML = "<h3>"+ info.id +" - " + info.name + "</h3>" + 
                        "<img src='"+ info.sprites['front_default'] +"'>";
}

randomNumber = () => {
    return Math.ceil(Math.random()*151);
}


btn.onclick = () => {
    infoPokemon(randomNumber());
}

infoPokemon(randomNumber());
