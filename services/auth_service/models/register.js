const pool = require('./connection');
const {passwordUtils} = require('../utils');
module.exports = async function (username, password, email) {
    let conn;
    let registerMessage = null;
    try {
        //TODO check email
        if(password.length < 8) return null;
        if(username.length < 8) return null;

        const hashedPassword = await passwordUtils.hashPassword(password);
        conn = await pool.getConnection();
        const result = await conn.query(
            "INSERT INTO users (username,password,email) VALUES (?, ?, ?)",
            [username, hashedPassword, email]);

        if(result.insertId){
            registerMessage = result.insertId;
        }

    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return registerMessage;
}