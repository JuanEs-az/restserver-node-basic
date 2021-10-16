const { request, response } = require('express')
const { crypt } = require('../helpers/tools')
const Usuario = require('../models/usuario')

module.exports = {
        getAllUsers : async function(req, res){
            const query = {estado: true}
            const { limite = 5, desde = 0 } = req.query
            const [ users, total ] = await Promise.all([
                Usuario.find( query ).skip( desde * 1 ).limit( limite * 1 ),
                Usuario.countDocuments( query )
            ])
            res.json({
                error: false,
                message: 'Usuarios obtenidos con éxito',
                total,
                users,
            })
        },
        createUser: async function(req = request, res = response){
            try{
                const { nombre, correo, password, rol } = req.body
                const usuario = new Usuario( { nombre, correo, password: crypt( password ), rol } )
                await usuario.save()
                res.json({
                    error: false,
                    message: `Usuario ${ usuario.nombre } ha sido creado satisfactoriamente`,
                    user: usuario
                })
            }
            catch(err){
                res.status( 500 ).json({
                    error: true,
                    message: 'No se pudo crear este usuario debido a un error del servidor',
                    log: err
                })
            }

        },
        putUsers: async function(req, res){
            const { id } = req.params;
            const { _id, password, google, correo, ...user } = req.body;
            //*TODO: validar ID contra DB -DONE-
            if( password ){
                user.password = crypt( password )
            }            
            const usuario = await Usuario.findByIdAndUpdate( id, user )
            res.json({
                error: false,
                message: 'Usuario e Información actualizados con éxito',
                user: usuario
            })
        },
        deleteUsers: async function(req, res){
            const { id } = req.params
            const user = await Usuario.findByIdAndUpdate( id, { estado: false } )
            res.json({
                error: false,
                message: 'Usuario eliminado con éxito',
                user
            })
        },
}