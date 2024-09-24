import axios from 'axios';

const url = 'https://back-end-pokemonbattle.onrender.com/';  // Cambia esto a la URL del deploy si es necesario.
const local = 'http://localhost:3001';

export const PokemonApi = axios.create({
    baseURL: local,  // Cambia a `url` si prefieres usar la URL del deploy.
});

// Método para obtener todos los Pokémon
PokemonApi.getPokemons = () => {
    return PokemonApi.get('/pokemon');
};

// Método para crear un Pokémon
PokemonApi.createPokemon = (pokemonData) => {
    return PokemonApi.post('/pokemon', pokemonData);
};

// Método para iniciar una batalla
PokemonApi.fight = (pokemon1Id, pokemon2Id) => {
    return PokemonApi.post('/battles/fight', {
        pokemon1Id,
        pokemon2Id
    });
};
