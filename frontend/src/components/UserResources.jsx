import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const UserResources = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Risorse Utente
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            Questa è la pagina delle risorse riservate agli utenti. Qui puoi accedere alle funzionalità utente.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserResources;
