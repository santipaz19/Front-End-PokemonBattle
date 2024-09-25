import React, { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material'; // Importa correctamente desde Material-UI
import Button from '@mui/material/Button';
import PokemonCardStats from '../PokemonCard/PokemonCardStats';

const PokemonBattle = ({ pokemon1, pokemon2, handleRemovePokemon, startBattle, battleData }) => {
    const [currentTurn, setCurrentTurn] = useState(0);
    const [pokemon1Hp, setPokemon1Hp] = useState(pokemon1?.hp * 10);
    const [pokemon2Hp, setPokemon2Hp] = useState(pokemon2?.hp * 10);

    useEffect(() => {
        if (!pokemon1 || !pokemon2) {
            setPokemon1Hp(0);
            setPokemon2Hp(0);
            setCurrentTurn(0);
        } else {
            setPokemon1Hp(pokemon1.hp * 10);
            setPokemon2Hp(pokemon2.hp * 10);
            setCurrentTurn(0);
        }
    }, [pokemon1, pokemon2]);

    useEffect(() => {
        if (battleData && currentTurn < battleData.turns?.length) {
            const turn = battleData.turns[currentTurn];

            const timer = setTimeout(() => {
                if (turn.attacker === pokemon1?.name) {
                    setPokemon2Hp((prevHp) => Math.max(prevHp - turn.damage * 10, 0));
                } else if (turn.attacker === pokemon2?.name) {
                    setPokemon1Hp((prevHp) => Math.max(prevHp - turn.damage * 10, 0));
                }

                setCurrentTurn((prev) => prev + 1);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [currentTurn, battleData, pokemon1?.name, pokemon2?.name]);

    const handleRemovePokemonAndReset = (pokemon) => {
        handleRemovePokemon(pokemon);
        setCurrentTurn(0);

        if (pokemon1?.id === pokemon.id) {
            setPokemon1Hp(0);
        } else if (pokemon2?.id === pokemon.id) {
            setPokemon2Hp(0);
        }
    };

    return (
        <div>
            <Grid2
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                {pokemon1 && (
                    <Grid2 xs={12} sm={6} md={4}>
                        <PokemonCardStats
                            pokemon={pokemon1}
                            pokemonHp={pokemon1Hp}
                            handleRemovePokemon={handleRemovePokemonAndReset}
                        />
                    </Grid2>
                )}

                <Grid2 xs={12} sm={6} md={4} display="flex" alignItems="center" justifyContent="center">
                    <Button
                        variant="contained"
                        onClick={startBattle}
                        disabled={!pokemon1 || !pokemon2}
                        sx={{
                            backgroundColor: "#3498DB",
                            width: { xs: '100%', sm: 'auto' },

                            '&:hover': {
                                backgroundColor: "#2980B9",
                            },
                        }}
                    >
                        Start Battle
                    </Button>
                </Grid2>

                {pokemon2 && (
                    <Grid2 xs={12} sm={6} md={4}>
                        <PokemonCardStats
                            pokemon={pokemon2}
                            pokemonHp={pokemon2Hp}
                            handleRemovePokemon={handleRemovePokemonAndReset}
                        />
                    </Grid2>
                )}
            </Grid2>
        </div>
    );
};

export default PokemonBattle;