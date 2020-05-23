const queryBuilder = require('./queryBuilder');
const db = require('../connection');

module.exports = async function(data){
    let res;
    if(!data.options.length){
        console.log(data.chart.chart_type);
        res = await runQuery(createQuery(data)[0],[]);
        console.log(res);
    } else{
        const query = createQuery(data);
        res = await runQuery(query[0], query[1]);
    }
    return {data:res, status:200};
}
function createQuery(data){
    let select, groupBy, xAxis, xAxisOption;
    const chartType = data.chart.chart_type;
    if(chartType === 'calendar'){
        select = 'select CAST(start_time AS date), count(id) ';
        groupBy = 'group by CAST(start_time AS date)';
        return queryBuilder(data.options, select, groupBy);
    } else if(chartType === 'line'){
        xAxis = data.chart.x_axis;
        xAxisOption = data.chart.x_axis_option;
        if(xAxis === 'start_time'){
            if(xAxisOption === 'day'){
                select = 'select CAST(start_time AS date), count(id) ';
                groupBy = 'group by CAST(start_time AS date)';
                return queryBuilder(data.options, select, groupBy);
            } else if(xAxisOption === 'month'){
                select = "select to_char(CAST(start_time AS date),'YYYY-MM-01') as start_time, count(id)";
                groupBy = " group by to_char(CAST(start_time AS date),'YYYY-MM-01')";
                return queryBuilder(data.options, select, groupBy);
            } else if(xAxisOption === 'year'){
                select = "select to_char(CAST(start_time AS date),'YYYY-01-01') as start_time, count(id)";
                groupBy = " group by to_char(CAST(start_time AS date),'YYYY-01-01')";
                return queryBuilder(data.options, select, groupBy);
            }
        } else{
            //TODO check if xAxis is actually a column
            if(checkxAxis(xAxis)){
                select = `select ${xAxis} as start_time, count(id)`;
                groupBy = ` group by ${xAxis}`;
                return queryBuilder(data.options, select, groupBy);
            }
            return null;
        }
    }
}




async function runQuery(sql, params) {
    let res, conn;
    try {
        conn = await db.connect();

        res = await conn.query(sql, params);

        // console.log(res[0]);
        // console.log(res[1]);
        res = res.map(a => [a.start_time,a.count]);
        // console.log(res[0]);
        // console.log(res[1]);
    } catch (err) {
        console.log(err);
        res = err;
    } finally {
        conn.done();
    }
    return res;
}

function checkxAxis(xAxis){
    const simpleColumns = ['Source', 'Severity', 'Side', 'Timezone', 'Amenity', 'Bump', 'Crossing', 'Give_Way', 'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight'];
    const dropdownColumns = ['TMC', 'Street', 'Number', 'City', 'County', 'State', 'Airport_Code', 'Wind_Direction', 'Weather_Condition'];
    const arr = [...simpleColumns, ...dropdownColumns];
    for (let i = 0; i < arr.length; i++) {
        if(xAxis.toLowerCase() === arr[i].toLowerCase()){
            return true;
        }
    }
    return false;
}