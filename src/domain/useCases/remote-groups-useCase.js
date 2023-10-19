import Api from "../../helpers/api"
import { ServerError, UnauthorizedError, NotFoundError } from "../errors/errors"
import { httpStatusCode } from "../protocols/http-response"
export const ListGroups = async () => {
    try {
        const response = await Api.get('/groups')
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('grupos')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}
export const remoteFetchGroupUseCase = async (id) => {
    try {
        const response = await Api.get(`/group/${id}`)
        return response.data
    } catch (error) {
        switch (error.response.stauts) {
            case httpStatusCode.notFound: throw new NotFoundError('grupos')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }

}
export const remoteAddGroupUseCase = async (body) => {
    try {
        const response = await Api.post('/group', { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}

export const remoteUpdateGroupUseCase = async (id, body) => {
    try {
        const response = await Api.put(`/group/${id}`, { ...body })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new NotFoundError('grupos')
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}