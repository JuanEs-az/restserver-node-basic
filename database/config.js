const mongoose = require('mongoose')
const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )
        console.log('DB is Online')
    }catch( err ){
        console.log( err )
        throw new Error('DB Error');
    }
}
module.exports = {
    dbConnection
}