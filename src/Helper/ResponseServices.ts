type CustomResponse = {
    message?: string,
    status?: boolean,
    data?: object | string[]
}

export const
    customResponse = (message = '', status = true, data = {}): CustomResponse => {
        return { status, message, data }
    }