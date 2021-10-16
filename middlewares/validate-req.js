const { validationResult } = require('express-validator')


const validateRequest = (req, res, next) => {
    const error = validationResult( req )
    if( !error.isEmpty() ) return res.status(400).json( { error: true, message: error.errors[0].msg } )

    next()
}


module.exports = {
    validateRequest,
}