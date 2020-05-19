const db = require('../connection');

module.exports = async function(column, input){
    let res, sql;
    if(!isNaN(input)){
        console.log(input);
        sql = 'SELECT DISTINCT $1~ FROM accidents WHERE CAST($1~ AS varchar(20)) LIKE $2 ORDER BY $1~ LIMIT 50 ';
    } else{
        sql = 'SELECT DISTINCT $1~ FROM accidents WHERE $1~ ILIKE $2 ORDER BY $1~ LIMIT 50 ';
    }
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