import Api from "../../helpers/api"
import { ServerError, UnauthorizedError } from "../errors/errors"
import { httpStatusCode } from "../protocols/http-response"
export const authUseCase = async (email, password) => {
    try {
        const response = await Api.post('/auth', { email, password })
        return response.data
    } catch (error) {
        switch (error.response.status) {
            case httpStatusCode.notFound: throw new UnauthorizedError()
            case httpStatusCode.unauthorized: throw new UnauthorizedError()
            default: throw new ServerError()
        }
    }
}