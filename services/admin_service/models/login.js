
const db = require('./connection');



module.exports = async function(username, password){
    let res, sql, conn;

    sql = "SELECT count(*) FROM admins WHERE username=$1 and password=$2 ";
    try {
        conn = await db.connect();
        res = await conn.query(sql,[username,password]);
        res = extractValues(res);

    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }

    return res[0] === '1';
};

function extractValues(data){
    return data.map(v => { return v[Object.keys(v)[0]]; });
}