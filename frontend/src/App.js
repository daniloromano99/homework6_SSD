import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button } from '@mui/material';
import AdminResources from './components/AdminResources';
import UserResources from './components/UserResources';
import ProtectedRoute from './components/ProtectedRoute';
import PostLoginRedirect from './components/PostLoginRedirect';

function App() {
  const { keycloak, initialized, error } = useKeycloak();

  if (error) {
    return <div>Error initializing Keycloak: {error.message}</div>;
  }

  if (!initialized) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Keycloak React App
          </Typography>
          {keycloak.authenticated && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={['user', 'admin']}>
                <UserResources />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<PostLoginRedirect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
