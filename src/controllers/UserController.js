const connection = require('../database/connection')
const { createToken } = require('../modules/jwt')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async create(req, res) {
        const response = {...responseModel}
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
            response.data = [{ token: await createToken(id) }]
        }

        return res.json(response)
    },

    async list(req, res) {
        const response = {...responseModel}

        const [, data] = await connection.query(`
            SELECT id FROM users
        `);

        if(data) {
            response.success = true
            response.data = data
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

        if(data.length > 0) {
            response.success = true
            response.data = [{ token: await createToken(data[0].id) }]
        }

        return res.json(response)
    },

    async update(req, res) {
        const response = {...responseModel}

        const { username, email, password } = req.body;

        const [{ affectedRows }] = await connection.query(`
            UPDATE users 
            SET 
                ${username ? `username="${username}"` : ''} ${username && (email || password) ? ',' : ''}
                ${email ? `username="${email}"` : ''} ${(username || email) && password ? ',' : ''}
                ${password ? `username="${password}"` : ''}
            WHERE id=${req.id}
        `);

        response.success = affectedRows > 0

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
