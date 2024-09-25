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

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPokemonData({ ...pokemonData, [name]: value });
        setErrorMessage(''); // Limpiar mensaje de error al cambiar el campo
    };

    // Manejar cambios en los sliders
    const handleSliderChange = (name) => (event, value) => {
        setPokemonData({ ...pokemonData, [name]: value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos necesarios estén llenos
        const { name, id, type, imageUrl } = pokemonData;
        if (!name || !id || !type || !imageUrl) {
            setErrorMessage('Por favor, completa todos los campos.'); // Establecer mensaje de error
            return; // Detener la ejecución si hay campos vacíos
        }

        onCreatePokemon(pokemonData); // Pasamos el nuevo Pokémon al padre
        onClose(); // Cerramos el modal después de crear
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
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }} // Reducir altura
                    />
                    <TextField
                        label="Nombre"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.name}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }} // Reducir altura
                    />
                    <TextField
                        label="Tipo"
                        name="type"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.type}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }} // Reducir altura
                    />
                    <TextField
                        label="Imagen"
                        name="imageUrl"
                        variant="outlined"
                        fullWidth
                        value={pokemonData.imageUrl}
                        onChange={handleChange}
                        sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { height: 49 } }} // Reducir altura
                    />
                    {/* Slider para HP */}
                    <Typography gutterBottom>HP</Typography>
                    <Slider
                        value={pokemonData.hp}
                        onChange={handleSliderChange('hp')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1 }}
                    />

                    <Typography gutterBottom>Ataque</Typography>
                    <Slider
                        value={pokemonData.attack}
                        onChange={handleSliderChange('attack')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1 }}
                    />

                    <Typography gutterBottom>Defensa</Typography>
                    <Slider
                        value={pokemonData.defense}
                        onChange={handleSliderChange('defense')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1 }}
                    />

                    <Typography gutterBottom>Velocidad</Typography>
                    <Slider
                        value={pokemonData.speed}
                        onChange={handleSliderChange('speed')}
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        sx={{ marginBottom: 1 }}
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
