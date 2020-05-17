const pool = require('./connection');
module.exports = async function (columns, page, maxEntries) {
    let conn;
    try {
        conn = await pool.getConnection();
        columns = columns.map(c => c.trim().toString());
        let sql = 'SELECT ';
        if(columns.length===0) sql += '* ';
        else {
            for(let i=0; i<columns.length; i++){
                sql += '`'+ columns[i] + '`,';
            }
            sql = sql.substring(0, sql.length - 1);
            sql += ' ';
        }
        sql += ' FROM accidents ';
        sql += ' limit ?, ?';

        const limit = page * maxEntries;

        return await conn.query(sql, [limit,maxEntries]);

    } catch (err) {
        return err;
    } finally {
        if (conn) conn.release(); //release to pool
    }

}