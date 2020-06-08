const db = require('../connection');
const read = require('./get_categories/readJson');

module.exports = async function(column, input){
    return await searchInCashedFiles(column, input);
    //return await sqlSearchSuggestions(column, input);
}
async function sqlSearchSuggestions(column, input){
    let res, sql;
    if(!isNaN(input)){
        console.log(input);
        sql = 'SELECT DISTINCT $1~ FROM accidents WHERE CAST($1~ AS varchar(20)) LIKE $2 ORDER BY $1~ LIMIT 50 ';
    } else{
        sql = 'SELECT DISTINCT $1~ FROM accidents WHERE $1~ ILIKE $2 ORDER BY $1~ LIMIT 50 ';
    }
    try {
        conn = await db.connect();
        res = await conn.query(sql,[ column, `${input}%`]);
        res = extractValues(res);
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res;
}

async function searchInCashedFiles(column, input){
    column = column.toLowerCase();
    const maxRes = 50;
    let count = 0, i = 0;
    let res = [];
    const data = await read(`./json_data/dropdown_categories/${column}.json`);
    try {
        while (count < maxRes && i < data.length) {
            if(data[i][column]!== null)
                if (data[i][column].toLowerCase().startsWith(input)) {
                    res.push(data[i][column]);
                    count++;
                }
            i++;
        }
    }catch(e){
        console.log(e);
    }
    return res;
}

function extractValues(data){
    return data.map(v => { return v[Object.keys(v)[0]]; });
}