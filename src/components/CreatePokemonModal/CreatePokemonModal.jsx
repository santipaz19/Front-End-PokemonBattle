import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const CreatePokemonModal = ({ open, onClose, onCreatePokemon }) => {

    const [pokemonData, setPokemonData] = useState({
        name: '',
        id: '',
        attack: 1,
        defense: 1,
        hp: 1,
        speed: 1,
        type: '',
        imageUrl: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPokemonData({ ...pokemonData, [name]: value });
        setErrorMessage('');
    };

    const handleSliderChange = (name) => (event, value) => {
        setPokemonData({ ...pokemonData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, id, type, imageUrl } = pokemonData;
        if (!name || !id || !type || !imageUrl) {
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }

        onCreatePokemon(pokemonData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    px: 5,
                    py: 2,
                    boxShadow: 24,
                    borderRadius: 1,
                    width: { xs: 300, sm: 450 },
                }}
            >
                <h2 className='mb-2'>Crear nuevo Pokémon</h2>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Id"
                        name="id"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.id}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }}
                    />
                    <TextField
                        label="Nombre"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.name}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }}
                    />
                    <TextField
                        label="Tipo"
                        name="type"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.type}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }}
                    />
                    <TextField
                        label="Imagen"
                        name="imageUrl"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.imageUrl}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }}
                    />

                    {/* Slider para HP - Color verde */}
                    <Typography gutterBottom>HP</Typography>
                    <Slider
                        value={pokemonData.hp}
                        onChange={handleSliderChange('hp')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1, color: '#4CAF50' }}
                    />

                    {/* Slider para Ataque - Color rojo */}
                    <Typography gutterBottom>Ataque</Typography>
                    <Slider
                        value={pokemonData.attack}
                        onChange={handleSliderChange('attack')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1, color: '#F44336' }}
                    />

                    {/* Slider para Defensa - Color amarillo */}
                    <Typography gutterBottom>Defensa</Typography>
                    <Slider
                        value={pokemonData.defense}
                        onChange={handleSliderChange('defense')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1, color: '#FFC107' }}
                    />

                    {/* Slider para Velocidad - Color azul */}
                    <Typography gutterBottom>Velocidad</Typography>
                    <Slider
                        value={pokemonData.speed}
                        onChange={handleSliderChange('speed')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1, color: '#2196F3' }}
                    />

                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 1, mt: 1 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Crear Pokémon
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreatePokemonModal;
