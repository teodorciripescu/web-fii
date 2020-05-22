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

        var options = {
            title: "Accidents",
            height: 900,
            width:925
        };

        chart.draw(dataTable, options);
    });
}