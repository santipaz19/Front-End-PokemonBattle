import { useState } from 'react';
import { PokemonApi } from '../api/PokemonApi';

export const usePokemonBattle = () => {
    const [battleData, setBattleData] = useState(null); // Estado para almacenar respuesta de la batalla
    const [selectedPokemons, setSelectedPokemons] = useState([]); // Estado para almacenar los Pokémon seleccionados
    const [errors, setErrors] = useState(''); // Estado para almacenar mensajes de error

    // Función para manejar la selección de un Pokémon
    const handleSelectPokemon = (pokemon) => {
        if (selectedPokemons.length < 2) {
            setSelectedPokemons((prev) => [...prev, pokemon]);
            setErrors(''); // Limpiar mensajes de error si la selección es exitosa
        } else {
            setErrors("Ya has seleccionado dos Pokémon");
        }
    };

    // Función para eliminar un Pokémon seleccionado
    const handleRemovePokemon = (pokemonToRemove) => {
        setSelectedPokemons((prev) => {
            // Filtrar el primer Pokémon igual y mantener el resto
            const indexToRemove = prev.findIndex((pokemon) => pokemon.id === pokemonToRemove.id);

            if (indexToRemove !== -1) {
                // Crear una nueva lista sin el Pokémon encontrado
                return [...prev.slice(0, indexToRemove), ...prev.slice(indexToRemove + 1)];
            }

            return prev; // Devolver la lista original si no se encuentra el Pokémon
        });

        setBattleData(null);
        setErrors(''); // Limpiar errores al eliminar un Pokémon
    };

    // Función para iniciar la batalla
    const startBattle = async (pokemons) => {

        // Verificar si hay datos de batalla previos y reemplazar el perdedor si es necesario
        let currentPokemons = [...selectedPokemons];
        setErrors('')
        if (battleData && battleData.loser) {
            // Filtrar Pokémon que no sea el perdedor
            const availablePokemons = pokemons.filter(p => p.name !== battleData.loser.name);

            // Si hay Pokémon disponibles, seleccionar uno aleatoriamente
            if (availablePokemons.length > 0) {
                const randomIndex = Math.floor(Math.random() * availablePokemons.length);
                const newPokemon = availablePokemons[randomIndex];

                // Reemplazar el primer Pokémon que coincida con el perdedor
                const loserIndex = currentPokemons.findIndex(pokemon => pokemon.name === battleData.loser.name);
                if (loserIndex !== -1) {
                    currentPokemons[loserIndex] = newPokemon; // Reemplazar solo el primero encontrado
                }
            } else {
                setErrors("No hay Pokémon disponibles para reemplazar.");
            }
        }

        // Si se seleccionaron dos Pokémon, iniciar la batalla
        if (currentPokemons.length === 2) {
            try {
                setSelectedPokemons(currentPokemons);

                const response = await PokemonApi.fight(currentPokemons[0].id, currentPokemons[1].id);

                console.log(response.data);
                setBattleData(response.data);
            } catch (error) {
                setErrors('Error iniciando la batalla: ' + error.message);
            }
        } else {
            setErrors("Selecciona dos Pokémon para empezar la batalla.");
        }
    };


    return {
        selectedPokemons,
        battleData,
        errors,
        handleSelectPokemon,
        handleRemovePokemon,
        startBattle
    };
};
