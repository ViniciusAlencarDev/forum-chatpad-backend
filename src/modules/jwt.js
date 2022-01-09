const jwt = require('jsonwebtoken')

module.exports = {
    
    async createToken(id) {
        return await jwt.sign({ id }, process.env.SECRET)
    },

    async verifyToken(req, res, next) {
        const token = req.headers['x-access']

        if(!token) {
            return res.json({
                success: false,
                data: [],
                error: ['No token']
            })
        }

        await jwt.verify(token, process.env.SECRET, function(error, data) {
            if(error) {
                return res.json({
                    success: false,
                    data: [],
                    error: ['Error token']
                })
            }

            req.id = data.id

            next()
        })
    }

}
