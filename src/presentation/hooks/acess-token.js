import Api from "../../helpers/api"
import jwt_decode from 'jwt-decode'
const setToken = (token) => {
    localStorage.setItem('_user-acess', token)
    Api.defaults.headers.common['authorization'] = token
    return jwt_decode(token)
}
const loadToken = () => {
    const token = localStorage.getItem('_user-acess')
    if (!token) return
    return token;
}
const decodeToken = (token) => {
    const decoded = jwt_decode(token)
    return decoded
}
const removeToken = () => {
    localStorage.removeItem('_user-acess')
    Api.defaults.headers.common['authorization'] = ''
}
export {
    setToken,
    loadToken,
    decodeToken,
    removeToken
}