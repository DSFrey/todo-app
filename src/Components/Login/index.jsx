import { Button, Text, TextInput } from "@mantine/core";
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/auth";
import './login.scss'

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const {
    isLoggedIn,
    login,
    logout,
  } = useContext(AuthContext);

  return (
    isLoggedIn
      ? <div className="login-area">
        <Button color="red" onClick={() => logout()}>Log Out</Button>
      </div>
      : <div className="login-area">
        <TextInput
          name="username"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="green" onClick={() => login(username, password)}>Log In</Button>
      </div>
  )
}