const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async create(req, res) {
        const response = {...responseModel}

        // const [, data] = await connection.query(`
           
        // `);

        return res.json(response)
    },

    async login(req, res) {
        const response = {...responseModel}

        return res.json(response)
    },

    async create(req, res) {
        const response = {...responseModel}

        return res.json(response)
    }

}
