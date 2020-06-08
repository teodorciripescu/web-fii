
const db = require('./connection');



module.exports = async function(username){
    let res, sql,sql0, conn,res0;

       sql0="select count(*) from admins where username=$1";
        sql="delete from admins where username=$1";

    try {
        conn = await db.connect();


       res0=await conn.query(sql0,[username]);
       res = await conn.query(sql,[username]);


        res0=extractValues(res0);
        res=res0;
        console.log(res0);

        console.log(res[0]);


        console.log("res2:"+res[0]);
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