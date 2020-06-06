
const db = require('./connection');



module.exports = async function(username, msg,date){
    let res, sql, conn,finalRes;

    sql = "select trim(message) from posts order by dateul desc limit 5";
    try {
        conn = await db.connect();

        res = await conn.query(sql);
      //  console.log();
        //res[0]='1';
        ///finalRes + stringify

// finalRes={post1:res[0],post2:res[1].value,post3:res[2].value,post4:res[3].value,post5:res[4].value};
        finalRes={posts:[res[0].btrim,res[1].btrim,res[2].btrim,res[3].btrim,res[4].btrim]};
        //finalRes={post1:res[0].btrim,post2:res[1].btrim,post3:res[2].btrim,post4:res[3].btrim,post5:res[4].btrim};
 console.log( JSON.stringify(finalRes));



    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    //console.log('--->',JSON.stringify(res));
    //return res[0] === '1';
    return JSON.stringify(finalRes);
};

function extractValues(data){
    return data.map(v => { return v[Object.keys(v)[0]]; });
}