const db = require('../connection');

module.exports = async function(id){
    let res, conn;
    try {
        conn = await db.connect();
        res = await conn.query(`select * from accidents where id=$1`, [id]);
        res = res[0];
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return {data:res, status:200};
}