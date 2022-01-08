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

        const { usernameOrEmail, password } = req.body;

        const [, data] = await connection.query(`
            SELECT id FROM users WHERE 
                (username='${usernameOrEmail}' OR email='${usernameOrEmail}') AND password='${password}'
            ORDER BY id DESC LIMIT 1
        `);

        response.success = data.lenth > 0

        return res.json(response)
    },

    async delete(req, res) {
        const response = {...responseModel}

        const [, affectedRows] = await connection.query(`
            DELETE FROM users WHERE id=${req.id}
        `);

        response.success = affectedRows > 0

        return res.json(response)
    }

}
