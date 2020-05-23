function chartTypeChanged(){
    const chartType = document.getElementById('chartTypeSelect').value;
    var chartSpecificOptions = document.getElementById('chartSpecificOptions');
    if(chartType==='Line Chart'){
        const htmlContent = getLineChartSpecificOptionsAsHtml();
        chartSpecificOptions.innerHTML = htmlContent;
    } else{
        chartSpecificOptions.innerHTML = '';
    }
}

function getLineChartSpecificOptionsAsHtml(){
    const simpleColumns = ['Source', 'Severity', 'Side', 'Timezone', 'Amenity', 'Bump', 'Crossing', 'Give_Way', 'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight'];
    const dropdownColumns = ['TMC', 'Street', 'Number', 'City', 'County', 'State', 'Airport_Code', 'Wind_Direction', 'Weather_Condition'];
    const arr = [...simpleColumns, ...dropdownColumns];
    let selectOptions = '';
    for (let i = 0; i < arr.length; i++) {
        selectOptions += `<option  value="${arr[i].toLowerCase()}">${arr[i].toLowerCase().replace('_', ' ')}</option>`;
    }
    let htmlContent = `<h4> X axis: </h4>
    <select id="xAxisSelect" class="select-representation" onchange="lineChartXaxisSelectChanged()">
        <option  value="start_time">start_time</option>
        ${selectOptions}
    </select>
    <select id="xAxisOptionsSelect" class="select-representation">
        <option  value="month">Month</option>
        <option  value="day">Day</option>
        <option  value="year">Year</option>
    </select>
    `;
    return htmlContent;
}


function lineChartXaxisSelectChanged(){
    var xAxisSelect = document.getElementById('xAxisSelect');
    if(xAxisSelect.value !== 'start_time'){
        document.getElementById('xAxisOptionsSelect').style.display = 'none';
    } else{
        document.getElementById('xAxisOptionsSelect').style.display = 'block';
    }
}