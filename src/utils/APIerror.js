class APIerror extends error {
    constructor(
        statusCode,
        message =  "Something went wrong, please check again!",
        errors = [],
        stack = ''

    ){
        super(message)
        then.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this.this.constuctor)
        }
    }
}

export { APIerror }