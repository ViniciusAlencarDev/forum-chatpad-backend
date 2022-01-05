const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async create(req, res) {
        const response = {...responseModel}

        console.log('asd')

        const { username, email, password } = req.body;

        const [id, affectedRows] = await connection.query(`
           INSERT INTO users VALUES(
                DEFAULT,
                '${username}',
                '${email}',
                '${password}',
                '',
                NOW(),
                NOW()
           );
        `);

        if(affectedRows > 0) {
            response.success = true
            response.data = [{ token: id }]
        }

        return res.json(response)
    },

    async login(req, res) {
        const response = {...responseModel}

        const [, data] = await connection.query(`
            
        `);

        return res.json(response)
    },

    async delete(req, res) {
        const response = {...responseModel}

        return res.json(response)
    }

}
