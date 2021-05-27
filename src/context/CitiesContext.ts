import { createContext } from "react";

export interface ICity {
  city: string;
  id: number;
  population: number;
  region: string;
  country: string
}


interface ICitiesContextProps {
  cities: ICity[],
  addCity: (item: ICity) => void,
  deleteCity: (item: ICity) => void,
}


export const CitiesContext = createContext<ICitiesContextProps>({
  cities: [],
  addCity: () => { },
  deleteCity: () => {},
})