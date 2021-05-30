import { useEffect, useState } from "react"
import { ICity } from "../context/CitiesContext";



export const useCities = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [error, setError] = useState('');

  const addCity = (city: ICity) => {
    const isExist = cities.reduce((acc, i) => i.id === city.id ? true : acc, false);
    if (!isExist) {
      setCities(cities => {
        localStorage.setItem('Cities', JSON.stringify([...cities, city]))
        return [...cities, city]
      });
      return setError('');
    }
    setError('Выбранный Вами город уже добавлен')
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



  return {cities, addCity, deleteCity, error}
}