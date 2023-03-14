import Api from "../../helpers/api"
import { ServerError, UnauthorizedError, NotFoundError } from "../errors/errors"
import { httpStatusCode } from "../protocols/http-response"
export const remoteListClientesUseCase = async () => {
    try {
        const response = await Api.get('/clientes')
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('clientes')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const remoteAddClienteUseCase = async (body) => {
    try {
        const response = await Api.post('/cliente', { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.badRequest: throw new ServerError()
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const remoteUpdateClienteUseCase = async (id, body) => {
    try {
        const response = await Api.put(`/cliente/${id}`, { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.badRequest: throw new ServerError()
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const remotefetchClienteUseCase = async (id) => {
    try {
        const response = await Api.get(`/cliente/${id}`)
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.badRequest: throw new ServerError()
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
