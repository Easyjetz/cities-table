import { useEffect, useState } from "react"
import { ICity } from "../context/CitiesContext";



export const useCities = () => {
  const [cities, setCities] = useState<ICity[]>([]);

  const addCity = (city: ICity) => {
    setCities(cities => {
      localStorage.setItem('Cities', JSON.stringify([...cities, city]))
      return [...cities, city]
    });
  }

  const deleteCity = (city: ICity) => {
    const filteredCities = cities.filter((i: ICity) => i.id !== city.id);
    setCities(filteredCities);
    localStorage.setItem('Cities', JSON.stringify(filteredCities));
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Cities') || '[]');
    console.log(data);
    if (data) {
      setCities(data);
    }
  }, [])



  return {cities, addCity, deleteCity}
}