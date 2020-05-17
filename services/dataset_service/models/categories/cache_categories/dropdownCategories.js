const db = require('../../connection');
const fs = require('fs');
const write = require('./writeJson');
let conn;
module.exports = async function (categories) {
    let res;
    try {
        conn = await db.connect();
        let dropdownColumns = ['TMC', 'Street', 'Number', 'City', 'County', 'State', 'Airport_Code', 'Wind_Direction', 'Weather_Condition'];
        res = await getCategoryOptions(dropdownColumns);

    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res;
}

async function getCategoryOptions(columns){
    try{
        let sql, result;
        for(let i=0; i<columns.length; i++){
            sql = `SELECT ${columns[i]}, COUNT(ID) FROM accidents GROUP BY ${columns[i]};`;
            result = await conn.query(sql);
            await write(`./json_data/dropdown_categories/${columns[i].toLowerCase()}.json`, result);
        }
        let categories = [];
        for (let i = 0; i < columns.length; i++) {
            categories.push({
               key: columns[i].toLowerCase(),
               category_type: 'dropdown'
            });
        }
        await write(`./json_data/dropdownCategories.json`, categories);
    }catch(e){
        return e;
    }
    return true;
}
