const fs = require('fs');
const es = require('event-stream');
const { Pool, Client } = require('pg');
const sql = require('sql');
const client = new Pool();

let User = sql.define({
    name: 'accidents',
    columns: [
        'id',
        'source',
        'tmc',
        'severity',
        'start_time',
        'end_time',
        'start_lat',
        'start_lng',
        'end_lat',
        'end_lng',
        'distance',
        'description',
        'number',
        'street',
        'side',
        'city',
        'county',
        'state',
        'zipcode',
        'country',
        'timezone',
        'airport_code',
        'weather_timestamp',
        'temperature',
        'wind_chill',
        'humidity',
        'pressure',
        'visibility',
        'wind_direction',
        'wind_speed',
        'precipitation',
        'weather_condition',
        'amenity',
        'bump',
        'crossing',
        'give_way',
        'junction',
        'no_exit',
        'railway',
        'roundabout',
        'station',
        'stop',
        'traffic_calming',
        'traffic_signal',
        'turning_loop',
        'sunrise_sunset',
        'civil_twilight',
        'nautical_twilight',
        'astronomical_twilight'
    ]
});

var conn;
uploadDatasetSync();

async function uploadDatasetSync() {
    conn = await client.connect();
    const sql = "INSERT INTO accidents VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24," +
                                                "$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49)";
    var lineNmb = 0;let query;
    var data = [];
    var s = fs.createReadStream('/home/asttrid/Documents/US_Accidents_Dec19.csv')
        .pipe(es.split()) //impune stream-ului sa faca break la linii noi
        .pipe(es.mapSync(async function (line) {
            // punem pauza la stream (nu se continua citirea din fisier)
            s.pause();
            lineNmb += 1;
            // prima linie contine numele coloanelor
            if(lineNmb>1){
                const uploadData = correctValues(line.split(','));
                if(line) data.push(getAccidentToInsert(uploadData));

                //console.log(query);
                if(data.length === 1000){ // facem requesturi de insert la baza de date in batch-uri de cat 100
                    //const r = await conn.query(sql, data);
                    //const r = await insertData(data);
                    query = User.insert(data).toQuery();
                    //console.log(query);
                    let {rows} = await client.query(query);
                    try{

                    }
                    catch (e) {
                        //console.log(query);
                    }
                    console.log(lineNmb);
                    data = [];
                }
            }
                // facem resume la stream
                s.resume();
            })
                .on('error', function (err) {
                    console.log('Error while reading file.', err);
                    console.log(query);
                    console.log(lineNmb);
                })
                .on('end', async function () {
                    s.pause();
                    query = User.insert(data).toQuery();
                    //console.log(query);
                    let {rows} = await client.query(query);
                    console.log(lineNmb);
                    console.log('Read entire file.');
                    s.resume();
                })
        );
}
function correctValues(arr){
    for(let i=0; i<arr.length; i++){
        if(arr[i]==='') arr[i]=null;
        else if(!isNaN(arr[i])) arr[i]=parseFloat(arr[i]);
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

function insertData(columns){
    let promises = [];
    for(let i=0; i<columns.length; i++){
        promises.push(new Promise(async resolve => {
            const sql = "INSERT INTO accidents VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24," +
                "$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49)";
            conn.query(sql,columns[i])
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    resolve(err);
                });
        }));
    }
    return Promise.all(promises);
}

function getAccidentToInsert(data){
    return {
        id:data[0],
        source:data[1],
        tmc:data[2],
        severity:data[3],
        start_time:data[4],
        end_time:data[5],
        start_lat:data[6],
        start_lng:data[7],
        end_lat:data[8],
        end_lng:data[9],
        distance:data[10],
        description:data[11],
        number:data[12],
        street:data[13],
        side:data[14],
        city:data[15],
        county:data[16],
        state:data[17],
        zipcode:data[18],
        country:data[19],
        timezone:data[20],
        airport_code:data[21],
        weather_timestamp:data[22],
        temperature:data[23],
        wind_chill:data[24],
        humidity:data[25],
        pressure:data[26],
        visibility:data[27],
        wind_direction:data[28],
        wind_speed:data[29],
        precipitation:data[30],
        weather_condition:data[31],
        amenity:data[32],
        bump:data[33],
        crossing:data[34],
        give_way:data[35],
        junction:data[36],
        no_exit:data[37],
        railway:data[38],
        roundabout:data[39],
        station:data[40],
        stop:data[41],
        traffic_calming:data[42],
        traffic_signal:data[43],
        turning_loop:data[44],
        sunrise_sunset:data[45],
        civil_twilight:data[46],
        nautical_twilight:data[47],
        astronomical_twilight:data[48]
    }
}