import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const AdminResources = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Risorse Admin
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            Questa è la pagina delle risorse riservate agli amministratori. Qui puoi gestire le funzionalità amministrative.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminResources;
