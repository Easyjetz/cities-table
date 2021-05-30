import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const CitiesNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand>React Table</Navbar.Brand>
        <Nav className="mr-right">
          <NavLink className="navbar__item" to="/search">Добавить город</NavLink>
          <NavLink className="navbar__item" to="/table">Таблица</NavLink>
      </Nav>
      </Container>
  </Navbar>
  )
}