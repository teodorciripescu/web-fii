function drawChart(){
    const selectedChart = document.getElementById('chartTypeSelect').value;
    switch(selectedChart){
        case 'Calendar Chart':
            drawCalendarChart();
            break;
        case 'Line Chart':
            drawLineChart();
            break;
    }
}