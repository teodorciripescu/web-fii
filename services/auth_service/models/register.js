const db = require('./connection');
const {passwordUtils} = require('../utils');
module.exports = async function (username, password, email) {
    let conn;
    let registerMessage = false;
    try {
        //TODO check email
        if(password.length < 8) return null;
        if(username.length < 8) return null;

        const hashedPassword = await passwordUtils.hashPassword(password);
        conn = await db.connect();
        //console.log(hashedPassword);
        const result = await conn.query(
            "INSERT INTO users (username,password,email) VALUES ($1, $2, $3)",
            [username, hashedPassword, email]);
        registerMessage = true;

    } catch (err) {
        console.log(err);
    } finally {
        conn.done();
        //if (conn) conn.release(); //release to pool
    }
    return registerMessage;
}