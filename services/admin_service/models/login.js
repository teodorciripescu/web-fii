
const db = require('./connection');



module.exports = async function(username, password){
    let res, sql, conn;

    //sql = "SELECT count(*) FROM admins WHERE username='ada' and password='stefy' ";
    sql = "SELECT count(*) FROM admins WHERE username=$1 and password=$2 ";
    try {
        conn = await db.connect();
        //res = await conn.query(sql);
        res = await conn.query(sql,[username,password]);
        console.log("us:"+username);
        console.log("pss:"+password);
        console.log("res:"+res);
        res = extractValues(res);
        console.log("res2:"+res);
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    //console.log('--->',JSON.stringify(res));
    return res[0] === '1';
};

function extractValues(data){
    return data.map(v => { return v[Object.keys(v)[0]]; });
}