
const db = require('./connection');



module.exports = async function(username, password){
    let res, sql, conn,sql0,res0;

   // if(password!=null)
    sql0="select count(*) from admins where username=$1";
        sql="insert into admins values($1,$2)";
/*    else
        sql="delete from admins where username=$1";*/

    //sql = "SELECT count(*) FROM admins WHERE username='ada' and password='stefy' ";
  //  sql = "SELECT count(*) FROM admins WHERE username=$1 and password=$2 ";
    try {
        conn = await db.connect();


        res0=await conn.query(sql0,[username]);
        res0=extractValues(res0);

        console.log(res0);
        if(res0[0]==='1')
        {
            console.log("ies prin if(res0[0]===1):");
            return 0;
        }
        else{

        res = await conn.query(sql,[username,password]);

            console.log(res);
        res=extractValues(res);

        console.log(res);
        console.log(res[0]);


        console.log("res2:"+res[0]);

        res[0]='1';

        }
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