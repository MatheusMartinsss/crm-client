export class ForbiddenError extends Error {
    constructor() {
        super(`Acesso negado!`)
        this.name = 'forbiddenError'
    }
}
export class NotFoundError extends Error {
    constructor(param) {
        super(`Nenhum ${param} encontrado.`)
        this.name = 'notFoundError'
    }
}
export class ServerError extends Error {
    constructor() {
        super(`Erro interno, entre em contato com o suporte!`)
        this.name = 'serverError'
    }
}
export class UnauthorizedError extends Error {
    constructor() {
        super(`Credenciais invalida!`)
        this.name = 'unauthorizedError'
    }
}