const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 8081
        //Configuración del Servidor
        this.settings()
        //Configuración de Rutas
        this.setRoutes()
    }
    settings(){
        this.connectDB() //CONECTAR A LA BASE DE DATOS
        this.app.use( cors() ) //CROSS ORIGIN ACCESS SETTINGS
        this.app.use( express.json() ) //BODY PARSING TO JSON 
        this.app.use( express.static('public') ) //Carpeta de contenido estatico
    }
    async connectDB(){
        await dbConnection()
    }
    setRoutes(){
        this.app.use( '/usuarios', require('../routes/usuario') )

    }
    listen(){
        this.app.listen( this.port , () => {
            console.log('Server running on port: ' + this.port)
        })
    }
}

module.exports = Server