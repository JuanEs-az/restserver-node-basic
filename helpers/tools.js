const bcryptjs = require('bcryptjs')
const crypt = data => bcryptjs.hashSync( data , bcryptjs.genSaltSync() );
module.exports = {
    crypt
}