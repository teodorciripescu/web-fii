const db = require('../connection');

module.exports = async function(column, input){
    let res;
    const sql = 'SELECT DISTINCT $1~ FROM accidents WHERE $1~ ILIKE $2 ORDER BY $1~ LIMIT 50 ';
    try {
        conn = await db.connect();
        res = await conn.query(sql,[ column, `${input}%`]);
        res = extractValues(res);
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res;
}

function extractValues(data){
    return data.map(v => { return v[Object.keys(v)[0]]; });
}