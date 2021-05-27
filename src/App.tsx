import React from 'react';
import { Container } from 'react-bootstrap';
import { CitiesTable } from './components/CitiesTable';
import { SearchCity } from './components/SearchCity';
import { CitiesContext } from './context/CitiesContext';
import { useCities } from './hooks/useCities';






function App() {
  const {cities, addCity, deleteCity } = useCities();
  return (
    <CitiesContext.Provider value={{cities, addCity, deleteCity}}>
      <div className="App">
        <Container>
          <SearchCity />
          <CitiesTable />
        </Container>
      </div>
    </CitiesContext.Provider>
  );
}

export default App;
