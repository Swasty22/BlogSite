class apiError extends Error{
    constructor(
        statusCode,
        message = 'something went wrong',
        error = [],
        data
    ){
        super(message),
        this.statusCode = statusCode,
        this.data=data,
        this.message=message,
        this.success=false,
        this.error=error

    }
}

export {apiError}