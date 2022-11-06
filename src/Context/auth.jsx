/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode';
import { useAxios } from "../hooks/api";

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
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { response, error } = useAxios({
        baseURL: 'https://api-js401.herokuapp.com/',
        url: '/signin',
        method: 'post',
        auth: {
          username,
          password
        }
      })
      setError(error)
      _validateToken(response.token);
    } catch (e) {
      setError(e);
      console.error(e);
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
    cookies,
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