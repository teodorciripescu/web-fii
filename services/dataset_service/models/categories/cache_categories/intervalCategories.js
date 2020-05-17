const db = require('../../connection');
const fs = require('fs');
const write = require('./writeJson');

let conn;
module.exports = async function (categories) {
    let res;
    try {
        conn = await db.connect();
        let normalColumns = ['Distance', 'Temperature', 'Wind_Chill', 'Humidity', 'Pressure', 'Visibility', 'Wind_Speed', 'Precipitation', 'Start_Time', 'End_Time', 'Weather_Timestamp'];
        res = await getCategoryOptions(normalColumns);
        await write('./json_data/intervalCategories.json', res);
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res;
}

async function getCategoryOptions(columns){
    let sql = '';
    for(let i=0; i<columns.length; i++){
        sql += `SELECT '${columns[i]}', MIN(${columns[i]}), MAX(${columns[i]}) FROM accidents;`;
    }
    const result = await conn.multi(sql);
    return organiseData(result);
}

function organiseData(data){
    var category;
    var organisedData = [];
    for (let i = 0; i < data.length; i++) {
        category = {
            key: data[i][0]['?column?'].toLowerCase(),
            category_type: 'interval',
            min: data[i][0]['min'],
            max: data[i][0]['max']
        };

        organisedData.push(category);
    }
    console.log(organisedData);
    return organisedData;
}
