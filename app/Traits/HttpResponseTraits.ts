interface HttpResponse {
    code: number;
    message: string;
    data?: any;
    errors?: any;
}

export class HttpResponseTraits {
    static success(payload: any = null, message: string = 'success', code: number = 200): HttpResponse {
        return {
            code: code,
            message: message,
            data: payload
        };
    }

    static dataNotFound(message: string = 'Data not found', code: number = 404): HttpResponse {
        return {
            code: code,
            message: message
        };
    }

    static checkValidation(errors: any = null): HttpResponse {
        return {
            code: 422,
            message: 'Check your validation',
            errors: errors
        };
    }

    static idOrDataNotFound(message: string = 'ID or data not found', code: number = 404): HttpResponse {
        return {
            code: code,
            message: message
        };
    }

    static delete(message: string = 'Success delete', code: number = 200): HttpResponse {
        return {
            code: code,
            message: message
        };
    }

    static errorMessage(message: string = 'Error Server', code: number = 400, error: any = null): HttpResponse {
        return {
            code: code,
            message: message,
            errors: error
        };
    }

    static validationLogin(message: string = 'Unauthorization', code: number = 200): HttpResponse {
        return {
            code: code,
            message: message,
        };
    }

    // static error(message: string = 'error', code: number = 400, payload: any = null, className: string | null = null, methodName: string = ''): HttpResponse {
    //     const data: HttpResponse = {
    //         code: code,
    //         message: message
    //     };

    //     if (payload) {
    //         console.error(className, {
    //             'Message: ' + payload.message,
    //             'Method: ' + methodName,
    //             'On File: ' + payload.fileName,
    //             'On Line: ' + payload.lineNumber
    //         });
    //     }

    //     return data;
    // }
}

