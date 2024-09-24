import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList/pokemonList';
import { PokemonApi } from './api/PokemonApi';
import PokemonBattle from './components/PokemonBattle/PokemonBattle';
import BattleLog from './components/BattleResult/BattleResult';
import { usePokemonBattle } from './hooks/usePokemonBattle';
import Navbar from './components/NavBar/navbar';
import PokemonModal from './components/PokemonModal/PokemonModal';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para manejar la apertura del modal
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para almacenar el Pokémon seleccionado para el modal
  const [searchText, setSearchText] = useState('');

  // hook de batalla
  const {
    selectedPokemons,
    battleData,
    errors,
    handleSelectPokemon,
    handleRemovePokemon,
    startBattle,
  } = usePokemonBattle();

  const fetchPokemons = async () => {
    try {
      const response = await PokemonApi.getPokemons();
      console.log(response.data);
      setPokemons(response.data);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Función para abrir el modal
  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPokemon(null);
  };

  // Filtrar Pokémon según el texto de búsqueda
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Función para limpiar los filtros
  const clearFilters = () => {
    setSearchText(''); // Reinicia el texto de búsqueda
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#2C3E50] pb-10">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <div className='gap-3 flex flex-col justify-center items-center pt-2 px-4'>
        <div className='justify-between flex lg:w-[49rem] w-full'>
          <h1 className='text-3xl md:text-start text-center  text-[#ECF0F1]'>Select your Pokemon</h1>
          <div className='flex gap-3'>
            <button
              onClick={clearFilters}
              className="bg-cyan-400 text-white py-1 px-2 rounded hidden sm:flex"
            >
              Crear pokemon
            </button>
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white py-1 px-2 rounded hidden sm:flex  hover:bg-red-600"
            >
              Limpiar Filtros
            </button>
          </div>

        </div>




        <PokemonList
          pokemons={filteredPokemons} // Pasar la lista filtrada de Pokémon
          onSelectPokemon={handleSelectPokemon}
          onOpenModal={handleOpenModal} // Pasamos la función para abrir el modal
        />

        <BattleLog
          pokemon1={selectedPokemons[0]}
          pokemon2={selectedPokemons[1]}
          battleData={battleData}
          errors={errors}
        />

        <PokemonBattle
          pokemon1={selectedPokemons[0]}
          pokemon2={selectedPokemons[1]}
          handleRemovePokemon={handleRemovePokemon}
          startBattle={() => startBattle(pokemons, selectedPokemons)}
          battleData={battleData}
        />

        {/* Componente Modal */}
        <PokemonModal
          open={openModal}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      </div>
    </div>
  );
}

export default App;
