const db = require('../../connection');
const fs = require('fs');
const write = require('./writeJson');

let conn;
module.exports = async function (categories) {
    let res;
    try {
        conn = await db.connect();
        let normalColumns = ['ID', 'Start_Lat', 'Start_Lng', 'End_Lat', 'End_Lng', 'Description', 'Zipcode'];
        res = organiseData(normalColumns);
        await write('./json_data/explicitCategories.json', res);
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res;
}

function organiseData(columns){
    let organisedData = [];
    for (let i = 0; i < columns.length; i++) {
        organisedData.push({
            key: columns[i].toLowerCase(),
            category_type: 'explicit'
        });
    }
    return organisedData;
}
