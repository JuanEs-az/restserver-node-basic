const Role = require('../models/role')
const Usuario = require('../models/usuario')
const validateRole = async(rol = '') => {
    const existeRol = await Role.findOne( { rol } )
    if( !existeRol ) throw new Error(`Rol ${ rol } invalido`)
}

const emailExists = async( correo ) => {
    if( await Usuario.findOne( { correo } ) ) throw new Error(`Ya existe una cuenta con este correo (${correo})`);
}

const userExistsById = async( id ) => {
    if( !await Usuario.findById( id ) ) throw new Error('El ID no existe')
}

module.exports = {
    validateRole,
    emailExists,
    userExistsById
}