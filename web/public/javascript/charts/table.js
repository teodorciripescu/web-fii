var currentTablePage = 0;
function observeChosenOptionsLabels(){
    var elementToObserve = window.document.getElementById('chosenOptionsLabels');
    var observer = new MutationObserver(
        function(mutationsList, observer) {
            currentTablePage = 0;
            loadNextTable();
        });
    observer.observe(elementToObserve, {characterData: false, childList: true, attributes: false});
}


async function loadTable(){
    const chartInfo = {
        chart_type: 'table',
        page: currentTablePage,
        amount: 10
    }
    let chartData = await requestLineInfo(chartInfo, chosenOptions[0]);
    chartData = chartData.data;
    let table = `<table class="flex-container panel-body principal " >`;
    let line = `<tr>`;
    for (let key of Object.keys(chartData[0])) {
        line += `<th>${key}</th>`;
    }
    line += `</tr>`;
    table += line;

    for (let i = 0; i <chartData.length; i++) {
        let line = `<tr>`;
        for (let key of Object.keys(chartData[i])) {
            line += `<th>${chartData[i][key]}</th>`;
        }
        line += `</tr>`;
        table += line;
    }
    table += `</table>`;
    document.getElementById('dataTable').innerHTML = table;
}

function loadPreviousTable(){
    if(currentTablePage > 1) {
        currentTablePage--;
        loadTable();
    }
}

function loadNextTable(){
    currentTablePage++;
    loadTable();
}


function resetTable(){
    for (let i = 0; i < chosenOptions.length; i++) {
        for (let j = 0; j < chosenOptions[i].length; j++) {
            if(chosenOptions[i][j].category_type === 'simple'){
                const checkboxId = chosenOptions[i][j].value + chosenOptions[i][j].key + 'Checkbox';
                document.getElementById(checkboxId).checked = false;

            }
        }
    }
    chosenOptions = [[]];
    currentLine = 0;
    currentTablePage = 0;
    loadChosenOptionLabels();
    loadNextTable();
}