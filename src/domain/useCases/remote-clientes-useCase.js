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
