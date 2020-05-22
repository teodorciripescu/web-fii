var whereParams, whereParamsCount;
module.exports = function(data, select, groupBy){
    let sql;
    data = sameKeyCategories(data);
    whereParams = [];
    whereParamsCount = 1;

    let from = 'from accidents ';

    if(!data.length){
        sql = select + from + groupBy + ';';
    } else {
        let where = ' where (';
        for (let i = 0; i < data.length - 1; i++) {
            where += createWhereChunk(data[i]);
            where += ' AND ';
        }
        where += createWhereChunk(data[data.length - 1]);
        where += ')';
        sql = select + from + where + groupBy + ';';
    }
    console.log(sql);
    for (let i = 0; i < whereParams.length; i++) {
        console.log(whereParams[i]);
    }
    //console.log();
    return [sql, whereParams];
}

function createWhereChunk(data){
    let where = '';
    if(data.category_type === 'interval') {
        where += '('
        for (let i = 0; i < data.value.length - 1; i++) {
            //min
            where += '(';
            where += ' $' + whereParamsCount + '~';
            whereParams.push(data.key);
            whereParamsCount++;
            where +=  '>=$' + whereParamsCount + ' AND ';
            whereParams.push(data.value[i].min);
            whereParamsCount++;

            //max
            where += ' $' + whereParamsCount + '~';
            whereParams.push(data.key);
            whereParamsCount++;
            where +=  '<=$' + whereParamsCount + ' ) OR ';
            whereParams.push(data.value[i].max);
            whereParamsCount++;
        }
        //min
        where += ' (';
        where += ' $' + whereParamsCount + '~';
        whereParams.push(data.key);
        whereParamsCount++;
        where +=  '>=$' + whereParamsCount + ' AND ';
        whereParams.push(data.value[data.value.length - 1].min);
        whereParamsCount++;

        //max
        where += ' $' + whereParamsCount + '~';
        whereParams.push(data.key);
        whereParamsCount++;
        where +=  '<=$' + whereParamsCount + ' )) ';
        whereParams.push(data.value[data.value.length - 1].max);
        whereParamsCount++;
    } else {
        where += '('
        for (let i = 0; i < data.value.length - 1; i++) {
            where += ' $' + whereParamsCount + '~';
            whereParams.push(data.key);
            whereParamsCount++;
            where +=  '=$' + whereParamsCount + ' OR ';
            whereParams.push(data.value[i]);
            whereParamsCount++;
        }
        where += ' $' + whereParamsCount + '~';
        whereParams.push(data.key);
        whereParamsCount++;
        where +=  '=$' + whereParamsCount + ') ';
        whereParams.push(data.value[data.value.length - 1]);
        whereParamsCount++;
    }
    return where;
}

function sameKeyCategories(data){
    let obj;
    var newData = [];
    for (let i = 0; i < data.length; i++) {
        if(data[i].category_type==='interval'){
            const foundIntervalCategory = searchCategory(newData, data[i]);
            if(foundIntervalCategory < 0){
                obj = {
                    key: data[i].key,
                    category_type: data[i].category_type,
                    value: [{min:data[i].min, max:data[i].max}]
                };
                newData.push(obj);
            }
            else{
                newData[foundIntervalCategory].value.push({min:data[i].min, max:data[i].max});
            }
        } else {
            const foundCategory = searchCategory(newData, data[i]);
            if(foundCategory < 0){
                obj = {
                    key: data[i].key,
                    category_type: data[i].category_type,
                    value: [data[i].value]
                };
                newData.push(obj);
            }
            else{
                newData[foundCategory].value.push(data[i].value);
            }
        }
    }
    return newData;
}
function searchCategory(data, obj) {
    for (let i = 0; i < data.length; i++) {
        if(data[i].key === obj.key && data[i].category_type === obj.category_type){
            return i;
        }
    }
    return -1;
}