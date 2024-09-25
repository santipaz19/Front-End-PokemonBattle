import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Grid2 } from '@mui/material';

const PokemonList = ({ pokemons, onSelectPokemon, onOpenModal }) => {
    return (
        <div className='flex justify-center flex-col items-center gap-3 w-full'
            style={{
                overflowX: 'auto',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                paddingBottom: '1rem'
            }}
        >
            {pokemons.length === 0 ? (
                <Typography variant="h6" color="#ECF0F1" sx={{ minHeight: 100, mt: 10 }}>
                    No hay Pokémon disponibles.
                </Typography>
            ) : (
                <Grid2 container spacing={4} sx={{ flexWrap: { xs: 'nowrap', md: 'wrap' } }}>
                    {pokemons.map((pokemon) => (
                        <Grid2 item key={pokemon?.id} xs={12} sm={6} md={4} sx={{ flex: '0 0 auto' }}>
                            <Card sx={{ width: 160, height: 200, bgcolor: '#E0F7FA' }}>
                                <CardActionArea onClick={() => onSelectPokemon(pokemon)}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 120, objectFit: 'contain' }}
                                        image={pokemon?.imageUrl && pokemon?.imageUrl}
                                        alt={pokemon?.name}
                                    />
                                    <CardContent sx={{ padding: 0, paddingLeft: 1 }}>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 16 }}>
                                            {pokemon?.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button onClick={() => onOpenModal(pokemon)} size="small" color="primary">
                                        Informacion
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </div>
    );
};

export default PokemonList;
