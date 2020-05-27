const pool = require('./connection');
const {passwordUtils} = require('../utils');
module.exports = async function (username, password) {
    let conn;
    let userId = 0;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT password FROM admins WHERE username=?", [username]);
        if (rows[0]) { // a fost gasit userul
            const checkPassword = await passwordUtils.comparePassword(password, rows[0].password);
            if (checkPassword) { // parola este cea buna
                userId = 1;
            }
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return userId;
}