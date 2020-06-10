
const db = require('./connection');



module.exports = async function(username, password){
    let res, sql, conn,sql0,res0;

    sql0="select count(*) from admins where username=$1";
    sql="insert into admins values($1,$2)";

    try {
        conn = await db.connect();


        res0=await conn.query(sql0,[username]);
        res0=extractValues(res0);

        if(res0[0]==='1')
        {
            return 0;
        }
        else{

        res = await conn.query(sql,[username,password]);
        res=extractValues(res);
        res[0]='1';

        }
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