const express = require('express')
const cors = require('cors')

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
        this.app.use( cors() ) //CROSS ORIGIN ACCESS SETTINGS 
        this.app.use( express.static('public') ) //Carpeta de contenido estatico
    }
    setRoutes(){
        this.app.use( '/api/users', require('../routes/users') )

    }
    listen(){
        this.app.listen( this.port , () => {
            console.log('Server running on port: ' + this.port)
        })
    }
}

module.exports = Server