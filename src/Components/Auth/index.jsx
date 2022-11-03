import { useContext } from "react"
import { AuthContext } from "../../Context/auth"

export const Auth = ({ capability, children }) => {
  const { isLoggedIn, can } = useContext(AuthContext)

  return isLoggedIn && can(capability)
    ? children
    : null
}