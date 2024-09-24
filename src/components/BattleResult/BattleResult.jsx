import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BattleLog = ({ battleData, pokemon1, pokemon2, errors }) => {
    const [currentTurn, setCurrentTurn] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(""); // Solo el mensaje actual

    useEffect(() => {
        // Si los Pokémon cambian (uno es eliminado), reinicia todo
        setCurrentTurn(0);
    }, [pokemon1, pokemon2]);

    useEffect(() => {
        if (currentTurn < battleData?.turns?.length) {
            const turn = battleData?.turns[currentTurn];
            // Multiplica el daño y los HP por 10
            const damage = turn.damage * 10;
            const hp1 = turn.hp1 * 10;
            const hp2 = turn.hp2 * 10;
            const totalHp1 = hp1 + damage; // Total HP antes del daño

            const turnMessage = `${turn.attacker} inflige ${damage} de daño a ${turn.defender}. HP restante: ${turn.defender === battleData.winner ? hp2 : hp1}/${totalHp1}.`;

            // Actualiza el mensaje actual
            setCurrentMessage(turnMessage);

            const timer = setTimeout(() => {
                setCurrentTurn((prev) => prev + 1);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [currentTurn, battleData]);

    return (
        <Box sx={{ padding: 2 }} >
            <Box

                sx={{
                    marginTop: 2,
                    backgroundColor: "#e3f8fe",
                    padding: 3,
                    border: "solid 1px black",
                    borderRadius: 2,
                    // Ancho responsivo
                    width: {
                        sm: "100%",

                        md: "49rem",
                    },
                    minWidth: "10rem",
                    maxWidth: "100%", // Asegurarse de que nunca exceda el 100%
                }}
            >
                {currentTurn < battleData?.turns?.length && (
                    <Typography variant="body1">
                        {currentMessage} {/* Muestra solo el mensaje actual */}
                    </Typography>
                )}
                {currentTurn >= battleData?.turns?.length && (
                    <Typography variant="h5">
                        El ganador es: {battleData.winner.name}!
                    </Typography>
                )}
                {errors && (
                    <Typography variant="body1">
                        {errors}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default BattleLog;
