
const db = require('./connection');



module.exports = async function(username, msg,date){
    let res, sql, conn,finalRes={};

    sql = "select trim(message) from posts order by dateul desc limit 5";
    try {
        conn = await db.connect();
        res = await conn.query(sql);
        res = res.map(x => x.btrim);
        finalRes = res;
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return finalRes;
};

function extractValues(data){
    return data.map(v => { return v[Object.keys(v)[0]]; });
}