const jwt = require('jsonwebtoken')

module.exports = {
    
    async createToken(token) {
        return await jwt.sign({ id }, process.env.SECRET)
    }

}