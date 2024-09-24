import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import PokemonCardStats from '../PokemonCard/PokemonCardStats';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '70%', sm: 400 }, // Puedes ajustar el tamaño según sea necesario
    bgcolor: '#FAEBD7',

    borderRadius: 2,
    display: 'flex', // Cambiar a flex
    flexDirection: 'column', // Cambiar a columna
    alignItems: 'center', // Alinear elementos al centro
    justifyContent: 'center', // Centrar verticalmente
    boxShadow: 24,
    pt: 3,
};

const PokemonModal = ({ open, onClose, pokemon }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>

                <PokemonCardStats
                    pokemon={pokemon}
                    onlyRead={true}
                    pokemonHp={pokemon?.hp ? pokemon.hp * 10 : 0}
                />
                <Button onClick={onClose} sx={{ mt: 2, width: '100%' }}>
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
};

export default PokemonModal;
