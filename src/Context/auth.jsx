/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode';

const testUsers = {
  admin: {
    username: 'admin',
    password: 'ADMIN',
    email: 'admin@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZDFiMzNjZTQ5MDAxODlmMzhiNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA3OTMxLCJleHAiOjE2NTg5MTE1MzF9.bqe-52if5K50rGn30P4fheuAa2qWuxse9tWiuH4cnUM',
  },
  editor: {
    username: 'editor',
    password: 'EDITOR',
    email: 'editor@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZjk5MzNjZTQ5MDAxODlmMzhiYSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4NTY5LCJleHAiOjE2NTg5MTIxNjl9.073ppQCHbplYN9befn8JElcP4zgFX6TEe_ARUQZc0KU',
  },
  user: {
    username: 'user',
    password: 'USER',
    email: 'user@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmMGZjMzNjZTQ5MDAxODlmMzhjMCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4OTI0LCJleHAiOjE2NTg5MTI1MjR9.t7c7k2LbaTxsdfYjx_WC3QiP4MycU8sZryVyXQqJQH',
  }
}

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        setError(null);
        setCookie('auth', token)
      }
    } catch (e) {
      setIsLoggedIn(false);
      setError(e);
      console.error(e);
    }
  }

  const login = (username, password) => {
    let authCredentials = testUsers[username];

    if (authCredentials?.password === password) {
      try {
        _validateToken(authCredentials.token);
      } catch (e) {
        setError(e);
        console.error(e);
      }
    }
  }
  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    setError(null)
    removeCookie('auth');
  }

  useEffect(() => {
    let token = cookies.auth;
    if (token) _validateToken(token);
  }, []);

  let values = {
    isLoggedIn,
    user,
    error,
    can,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}