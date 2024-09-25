import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import LinearProgress from '@mui/material/LinearProgress';

const PokemonCardStats = ({ pokemon, pokemonHp, handleRemovePokemon, onlyRead }) => {
    return (
        <Card
            sx={{
                width: { xs: 200, md: 250 },
                height: { md: 400 },
                bgcolor: '#E0F7FA'
            }}
        >
            {!onlyRead && <CardActions>
                <Button size="small" color="primary" onClick={() => handleRemovePokemon(pokemon)}>
                    Eliminar
                </Button>
            </CardActions>}
            <CardMedia
                component="img"
                sx={{
                    height: { xs: 120, sm: 150, md: 180 },
                    objectFit: 'contain',
                }}
                image={pokemon?.imageUrl}
                alt={pokemon?.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                    {pokemon?.name}
                </Typography>

                {/* Barra de HP */}
                <Typography variant="body2" color="text.secondary">
                    HP
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={pokemonHp}
                    sx={{
                        marginBottom: '5px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#4CAF50' },
                        borderRadius: '5px',
                    }}
                />

                {/* Barra de ataque */}
                <Typography variant="body2" color="text.secondary">
                    Ataque
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={(pokemon?.attack || 0) * 10}
                    sx={{
                        marginBottom: '5px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#F44336' },
                        borderRadius: '5px',
                    }}
                />

                {/* Barra de defensa */}
                <Typography variant="body2" color="text.secondary">
                    Defensa
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={(pokemon?.defense || 0) * 10}
                    sx={{
                        marginBottom: '5px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#FFC107' },
                        borderRadius: '5px',
                    }}
                />

                {/* Barra de velocidad */}
                <Typography variant="body2" color="text.secondary">
                    Velocidad
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={(pokemon?.speed || 0) * 10}
                    sx={{
                        marginBottom: '5px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#2196F3' },
                        borderRadius: '5px',
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default PokemonCardStats;
