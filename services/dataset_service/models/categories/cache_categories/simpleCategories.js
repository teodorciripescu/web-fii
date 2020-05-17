const db = require('../../connection');
const fs = require('fs');
const write = require('./writeJson');

let conn;
module.exports = async function (categories) {
    let res;
    try {
        conn = await db.connect();
        let normalColumns = ['Source', 'Severity', 'Side', 'Timezone', 'Amenity', 'Bump', 'Crossing',
            'Give_Way', 'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop',
            'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset',
            'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight'];
        res = await getCategoryOptions(normalColumns);
        await write('./json_data/simpleCategories.json', res);
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
        sql += `SELECT ${columns[i]}, COUNT(ID) FROM accidents GROUP BY ${columns[i]};`;
    }
    const result = await conn.multi(sql);
    return organiseData(result);
}

function organiseData(data){
    var category;
    var organisedData = [];
    for (let i = 0; i < data.length; i++) {
        category = {
            key: Object.keys(data[i][0])[0],
            category_type: 'simple',
            values: [],
            count: []
        };
        for (let j = 0; j < data[i].length; j++) {
            const categoryValue = data[i][j][category.key];
            if(categoryValue!==null) category.values.push(data[i][j][category.key]);
                else category.values.push('no data');
            category.count.push(data[i][j].count);
        }
        organisedData.push(category);
    }
    console.log(organisedData);
    return organisedData;
}
