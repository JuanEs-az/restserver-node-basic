module.exports = {
        getUsers : function(req, res){
            res.json({
                error: false,
                message: 'get to API - controller'
            })
        },
        postUsers: function(req, res){
            res.json({
                error: false,
                message: 'post to API - controller'
            })
        },
        putUsers: function(req, res){
            res.json({
                error: false,
                message: 'put to API - controller'
            })
        },
        deleteUsers: function(req, res){
            res.json({
                error: false,
                message: 'delete to API - controller'
            })
        },
}