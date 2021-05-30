import React from "react"
import { Switch, Route, Redirect} from 'react-router-dom';
import { CitiesTable } from "./components/CitiesTable";
import { SearchCity } from "./components/SearchCity"


export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/search">
                <SearchCity />
            </Route>
            <Route path="/table">
                <CitiesTable />
            </Route>
            <Redirect to='/search' />
        </Switch>
    )
}