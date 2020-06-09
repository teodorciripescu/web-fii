var chartDataExport;

function drawMapChart(){
    disableExportButtons();
    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(async function(){
        const chartInfo = {
            chart_type: 'line',
            x_axis: 'state',
            x_axis_option: null
        }
        var chartData = await sendOptions(chartInfo);
        chartDataExport = chartData;

        var data = new google.visualization.DataTable();
        if(chartInfo.x_axis === 'start_time'){
            data.addColumn({ type: 'date', id: 'Date' });
            for (let i = 0; i < chartData.length; i++) {
                chartData[i][0] = new Date(chartData[i][0]);
            }
        }
        else {
            data.addColumn({type: 'string', id: chartInfo.x_axis});
            for (let i = 0; i < chartData.length; i++) {
                chartData[i][0] = String(chartData[i][0]);
            }
            // chartData = chartData.data.map(a => [a[0].toString(),parseInt(a[1])]);
        }
        for (let i = 1; i < chartData[0].length; i++) {
            data.addColumn({ type: 'number', id: 'Accidents ' + i });
        }
        console.log(chartData[chartData.length - 1]);
        data.addRows(chartData);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
             width: computeChartWidth(),
             height: computeChartWidth()/2
        };

        var chart = new google.visualization.GeoChart(document.getElementById('chart'));

        google.visualization.events.addListener(chart, 'ready', function () {
            enableExportButtons();
        });

        chart.draw(data, options);
    });

}

function computeChartWidth() {
    const screenWidth = window.innerWidth;
    const chartElementWidth = document.getElementById('chart').offsetWidth;
    //console.log('chart width ', chartElementWidth);
    if(screenWidth > 800){
        return chartElementWidth;
    } else{
        return screenWidth - 20;
    }
}
