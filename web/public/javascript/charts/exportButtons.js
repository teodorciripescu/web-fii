function disableExportButtons(){
    document.getElementById("exportCsv").disabled = true;
    document.getElementById("exportPng").disabled = true;
    document.getElementById("exportSvg").disabled = true;
}

function enableExportButtons(){
    document.getElementById("exportCsv").disabled = false;
    document.getElementById("exportPng").disabled = false;
    document.getElementById("exportSvg").disabled = false;
}

function exportCsv(){
    let csvData = "data:text/csv;charset=utf-8,"
        + chartDataExport.map(e => e.join(",")).join("\n");
    download(csvData, 'chart.csv', 'text/csv');
}

function exportPng(){
    html2canvas(document.getElementById("chart")).then(canvas => {
        //canvas.toDataURL() -> base 64 encoding
        download(canvas.toDataURL(), 'chart.png', 'image/png');
    });
}

function exportSvg(){
    var chartElement = document.getElementById('chart');
    var chartSvg = chartElement.getElementsByTagName('svg');
    chartSvg[0].id = 'mySVG';
    const svgData = document.getElementById('mySVG').outerHTML;
    download(svgData, 'chart.svg', 'image/svg+xml');
}