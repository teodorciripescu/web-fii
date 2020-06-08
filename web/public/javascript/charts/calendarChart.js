var chartDataExport;
async function drawCalendarChart() {
    disableExportButtons();
    google.charts.load("current", {packages:["calendar"]});
    google.charts.setOnLoadCallback(async function(){
        const chartInfo = {
            chart_type: 'calendar'
        }
        var chartData = await sendOptions(chartInfo);
        chartDataExport = chartData;
        for (let i = 0; i < chartData.length; i++) {
            chartData[i][0] = new Date(chartData[i][0]);
        }
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'date', id: 'Date' });
        for (let i = 1; i < chartData[0].length; i++) {
            dataTable.addColumn({ type: 'number', id: 'Accidents ' + i });
        }
        dataTable.addRows(chartData);
        var chartElement = document.getElementById('chart');
        var chart = new google.visualization.Calendar(chartElement);
        google.visualization.events.addListener(chart, 'ready', function () {
            enableExportButtons();
        });
        var years = new Date(chartData[chartData.length-1][0] - chartData[0][0]).getFullYear() - 1970;
        var options = {
            title: "Accidents",
            calendar: {
                cellSize: computeCellSize()
            },
             height: ((years + 2) * 10 ) * computeCellSize(),
            // width:925
        };
        chart.draw(dataTable, options);
    });
}

function computeCellSize() {
    //console.log(window.innerWidth);
    const screenWidth = window.innerWidth;
    const chartElementWidth = document.getElementById('chart').offsetWidth;
    //console.log('chart width ', chartElementWidth);
    if(screenWidth > 800){
        return chartElementWidth / 60;
    } else{
        return screenWidth / 64;
    }
}