import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import PokemonCardStats from '../PokemonCard/PokemonCardStats';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '70%', sm: 400 },
    bgcolor: 'white',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 24,
    pt: 3,
    pb: 2,
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
                <Button onClick={onClose} sx={{ mt: 2, width: 'fit', color: 'white', bgcolor: '#3498DB' }}>
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
};

export default PokemonModal;
