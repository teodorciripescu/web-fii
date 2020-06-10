const db = require('./connection');

module.exports = async function(username, msg,date){
    let res, sql, conn;

    sql = "insert into posts values($1,$2,$3)";
    try {
        conn = await db.connect();

        res = await conn.query(sql,[username,msg,date]);

        res[0]='1';
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res[0] === '1';
};
