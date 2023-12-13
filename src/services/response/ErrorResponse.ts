import { Response, } from "express";
import { ValidationError } from 'joi';



class ErrorResponse {
    private error: any;
    private response: Response<any, Record<string, any>> | null;
    private payload: {};

    constructor() {
        this.error = null;
        this.response = null;
        this.payload = {}
    }

    public setResponse(response: Response<any, Record<string, any>>) {
        this.response = response;
        return this;
    }

    public setError(error: any) {
        this.error = error;
        return this;
    }

    public json() {
        if (this.response !== null) {
            console.warn('Error response ' + this.payload)
            this.response.json(this.payload)
        } else {
            throw new Error('No valid response')
        }


    }

    public build() {
        if (this.error !== null) {
            const data = {
                message: this.error.message || 'unknown error',
                errors: [] as any[],
                status: 400
            }
            if (this.error instanceof ValidationError) {
                data.status = 422
                data.message = 'Validation error'
                data.errors = this.error.details.map(el => {
                    const name = Array.isArray(el.path) ? el.path.find(path => el.message.includes(`${path}`)) || null : el.path;
                    return {
                        [name || 'common']: el.message
                    }
                })
            }

            this.payload = data;

            return this
        } else {
            throw new Error('No valid params for response')
        }
    }

}

export default new ErrorResponse();