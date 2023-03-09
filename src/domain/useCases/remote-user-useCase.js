import Api from "../../helpers/api"
import { ServerError, UnauthorizedError, NotFoundError } from "../errors/errors"
import { httpStatusCode } from "../protocols/http-response"

export const remoteFetchUsers = async () => {
    try {
        const response = await Api.get('/users')
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('Usuarios')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}

export const remoteAddUser = async (body) => {
    try {
        const response = await Api.post('/user', { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('Usuarios')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}