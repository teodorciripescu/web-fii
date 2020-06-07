const db = require('./connection');
const {passwordUtils} = require('../utils');
module.exports = async function (username, password) {
    let conn;
    let userId = 0;
    try {
        conn = await db.connect();
        const rows = await conn.query("SELECT id, password FROM users WHERE username=$1", [username]);
        if (rows[0]) { // a fost gasit userul
            const checkPassword = await passwordUtils.comparePassword(password, rows[0].password);
            if (checkPassword) { // parola este cea buna
                userId = rows[0].id;
            }
        }
    } catch (err) {
        throw err;
    } finally {
        conn.done();
    }
    return userId;
}