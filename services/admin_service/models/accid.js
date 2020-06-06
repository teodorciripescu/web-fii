
const db = require('./connection');



module.exports = async function(page){
    let res, sql, conn,finalRes;

    console.log("paginaaa:"+page);
    sql = "select * from accidents order by id asc limit 100 offset "+(page-1)*100;



    try {
        conn = await db.connect();
        res = await conn.query(sql);

        let vector=[];

        for(inf of res )
            vector.push(inf);

        finalRes={datele:vector};
        //finalRes={posts:[res[0].btrim,res[1].btrim,res[2].btrim,res[3].btrim,res[4].btrim]};

        console.log( JSON.stringify(finalRes));



    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }

    return JSON.stringify(finalRes);
};

