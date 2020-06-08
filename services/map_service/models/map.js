
const db = require('./connection');



module.exports = async function(latmax,latmin,lngmax,lngmin){
    let res, sql, conn,finalRes;

    sql = "select * from accidents where start_lat<= "+latmax+" and start_lat>= "+latmin+" and start_lng<= "+lngmax+" and start_lng>= "+lngmin+" order by id desc limit 25 ";



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

