import Api from "../../helpers/api"
import { ServerError, UnauthorizedError, NotFoundError } from "../errors/errors"
import { httpStatusCode } from "../protocols/http-response"
export const ListNegociacoes = async ({ clienteId, prioridade }) => {
    try {
        const response = await Api.get('/negociacoes', {
            params: {
                clienteId,
                prioridade
            }
        })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('negociacoes')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const createNegociacao = async (body) => {
    try {
        const response = await Api.post('/negociacao', { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const remoteFetchNegociacaoUseCase = async (id) => {

    try {
        const response = await Api.get(`/negociacao/${id}`)
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('negociacoes')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const updateNegociacao = async (id, body) => {
    try {
        const response = await Api.put(`/negociacao/${id}`, { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('negociacao')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}

export const getNegociacoesByGroup = async () => {
    try {
        const response = await Api.get('/groups/negociacoes')
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('Grupos')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}