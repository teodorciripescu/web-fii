const read = require('./readJson');

module.exports = async function (){
    return await read('./json_data/dropdownCategories.json');
}