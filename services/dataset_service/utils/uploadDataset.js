const fs = require('fs');
const es = require('event-stream');
const pool = require('../models/connection');

uploadDatasetSync();

async function uploadDatasetSync() {
    var conn = await pool.getConnection();
    const sql = "INSERT INTO accidents VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
                                                "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var lineNmb = 0;
    var data = [];
    var s = fs.createReadStream('/Users/teodorciripescu/Downloads/US_Accidents_Dec19.csv')
        .pipe(es.split())
        .pipe(es.mapSync(async function (line) {
            // punem pauza la stream (nu se continua citirea din fisier)
            s.pause();
            lineNmb += 1;
            // prima linie contine numele coloanelor
            if(lineNmb>1){
                const uploadData = correctValues(line.split(','));
                if(line) data.push(uploadData);

                if(data.length === 100){ // facem requesturi de insert la baza de date in batch-uri de cat 100
                    const r = await conn.batch(sql, data);
                    console.log(lineNmb);
                    data = [];
                }
            }
                // facem resume la stream
                s.resume();
            })
                .on('error', function (err) {
                    console.log('Error while reading file.', err);
                    console.log(lineNmb);
                })
                .on('end', async function () {
                    s.pause();
                    const r = await conn.batch(sql, data);
                    console.log(lineNmb);
                    console.log('Read entire file.');
                    s.resume();
                })
        );
}
function correctValues(arr){
    for(let i=0; i<arr.length; i++){
        if(arr[i]==='') arr[i]=null;
        else if(arr[i]==='True') arr[i]=true;
        else if(arr[i]==='False') arr[i]=false;
    }
    return arr;
}

function getValues(obj){
    var values = [];
    for(var key in obj){
        if(obj[key]==='') values.push(null);
        else if(obj[key]==='True') values.push(true);
        else if(obj[key]==='False') values.push(false);
        else values.push(obj[key]);
    }
    return values;
}

