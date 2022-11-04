import { Navbar, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom'
import { Login } from '../Login';
import './navbar.scss'

export const AppNavbar = () => {
  return (
    <Navbar>
      <Anchor component={Link} to='/'>Home</Anchor>
      <Anchor component={Link} to='/settings'>Settings</Anchor>
      <Login />
    </Navbar>
  )
}