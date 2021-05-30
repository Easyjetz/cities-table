import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { CitiesNavbar } from './components/Navbar';
import { CitiesContext } from './context/CitiesContext';
import { useCities } from './hooks/useCities';
import { useRoutes } from './routes';






function App() {
  const { cities, addCity, deleteCity, error } = useCities();
  
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <CitiesContext.Provider value={{ cities, addCity, deleteCity, error }}>
        <CitiesNavbar />
        <Container >
          {routes}
        </Container>
      </CitiesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
