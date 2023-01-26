import { removeToken } from "./acess-token"

export const logout = (setUser) => {
    removeToken()
    setUser(null)
}