import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList/pokemonList';
import { PokemonApi } from './api/PokemonApi';
import PokemonBattle from './components/PokemonBattle/PokemonBattle';
import BattleLog from './components/BattleResult/BattleResult';
import { usePokemonBattle } from './hooks/usePokemonBattle';
import Navbar from './components/NavBar/navbar';
import PokemonModal from './components/PokemonModal/PokemonModal';
import CreatePokemonModal from './components/CreatePokemonModal/CreatePokemonModal';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false); // Estado para manejar el modal de creación

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
    setSearchText('');
  };

  // Función para abrir el modal de creación
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  // Función para cerrar el modal de creación
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  // Función para añadir el nuevo Pokémon usando la API
  const handleCreatePokemon = async (newPokemon) => {
    try {

      const response = await PokemonApi.createPokemon(newPokemon);

      setPokemons([...pokemons, response.data]);
    } catch (error) {
      console.error('Error creating new pokemon:', error);
    }
    setOpenCreateModal(false);
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#2C3E50] pb-10">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <div className='gap-3 flex flex-col justify-center items-center pt-2 px-4'>
        <div className='justify-between flex lg:w-[49rem] w-full'>
          <h1 className='text-3xl md:text-start text-center text-[#ECF0F1]'>Select your Pokemon</h1>
          <div className='flex gap-3'>
            <button
              onClick={handleOpenCreateModal} // Abre el modal de creación
              className="bg-cyan-400 text-white py-1 px-2 rounded hidden sm:flex"
            >
              Crear Pokemon
            </button>
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white py-1 px-2 rounded hidden sm:flex hover:bg-red-600"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        <PokemonList
          pokemons={filteredPokemons}
          onSelectPokemon={handleSelectPokemon}
          onOpenModal={handleOpenModal}
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

        {/* Componente Modal de Información de Pokémon */}
        <PokemonModal
          open={openModal}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />

        {/* Componente Modal para Crear Pokémon */}
        <CreatePokemonModal
          open={openCreateModal}
          onClose={handleCloseCreateModal}
          onCreatePokemon={handleCreatePokemon}
        />
      </div>
    </div>
  );
}

export default App;
