var chosenOptions = [[]];
var currentLine = 0;

async function sendOptions(chartInfo){
    document.getElementById('sendDataButton').classList.add('loading');
    var promises = [];
    for (let i = 0; i < chosenOptions.length; i++) {
        promises.push(requestLineInfo(chartInfo, chosenOptions[i]));
    }
    const responses = await Promise.all(promises);
    const unifiedData = unifyResponses(responses);
    document.getElementById('sendDataButton').classList.remove('loading');
    return unifiedData;
}
function requestLineInfo(chartInfo, options){
    return new Promise(resolve => {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/data_queries', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const res = JSON.parse(this.responseText);
                resolve(res);
            }
        }
        // xhr.onloadstart = function () {
        //
        // };
        // xhr.onloadend = function () {
        // };

        xhr.send(JSON.stringify({chart:chartInfo, options}));
    });

}

function unifyResponses(data){
    //console.log('length: ', data.length);
    var xAxis = new Set();
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
            xAxis.add(data[i].data[j][0]);
        }
        //console.log('i=', i);
        //console.log('set size', xAxis.size);
    }
    xAxis = Array.from(xAxis);
    var unified = [];
    for (let k = 0; k < xAxis.length; k++) {
        let unifiedDataRow = [xAxis[k]];
        for (let i = 0; i < data.length; i++) {
            unifiedDataRow.push(null);
        }
        unified.push(unifiedDataRow);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].data.length; j++) {
                if(xAxis[k] === data[i].data[j][0]){
                    unified[k][i+1] = parseInt(data[i].data[j][1]);
                    break;
                }
            }
        }
    }
    unified.sort((a,b)=>{return (a[0]>b[0])?1:(a[0]<b[0])?-1:0;});
    return unified;
}

function loadChosenOptionLabels(){
    var labels = '<b>Y axis:</b> ';
    chosenOptions[currentLine].sort((a,b)=>{return (a.category_type > b.category_type) ? 1:(a.category_type < b.category_type)? -1:0;});
    //console.log(chosenOptions[currentLine].length);
    for (let i = 0; i < chosenOptions[currentLine].length; i++) {
        let labelId;

        switch (chosenOptions[currentLine][i].category_type) {
            case 'interval':
                labelId = chosenOptions[currentLine][i].key + chosenOptions[currentLine][i].min + chosenOptions[currentLine][i].max + chosenOptions[currentLine][i].category_type;
                labels += `<div id="${labelId}" class="chosen-option-label color-${chosenOptions[currentLine][i].category_type}"><span onclick="deleteIntervalLabel('${labelId}','${chosenOptions[currentLine][i].key}','${chosenOptions[currentLine][i].min}','${chosenOptions[currentLine][i].max}')" class="remove-label">&times;</span>${chosenOptions[currentLine][i].key}: (${chosenOptions[currentLine][i].min}, ${chosenOptions[currentLine][i].max})</div>`;
                break;
            default:
                labelId = chosenOptions[currentLine][i].value + chosenOptions[currentLine][i].key + chosenOptions[currentLine][i].category_type;
                labels += `<div id="${labelId}" class="chosen-option-label color-${chosenOptions[currentLine][i].category_type}"><span onclick="deleteLabel('${labelId}','${chosenOptions[currentLine][i].key}','${chosenOptions[currentLine][i].value}')" class="remove-label">&times;</span>${chosenOptions[currentLine][i].key}: ${chosenOptions[currentLine][i].value}</div>`;
        }
    }
    document.getElementById('chosenOptionsLabels').innerHTML = labels;
}

function deleteLabel(labelId, key, value){
    for (let i = 0; i < chosenOptions[currentLine].length; i++) {
        if(chosenOptions[currentLine][i].key === key && chosenOptions[currentLine][i].value === value){
            if(chosenOptions[currentLine][i].category_type === 'simple'){
                document.getElementById(value + key + 'Checkbox').checked = false;
            }
            chosenOptions[currentLine].splice(i, 1);
            break;
        }
    }
    loadChosenOptionLabels();
}

function deleteIntervalLabel(labelId, key, min, max){
    for (let i = 0; i < chosenOptions[currentLine].length; i++) {
        if(chosenOptions[currentLine][i].key === key && chosenOptions[currentLine][i].min === min && chosenOptions[currentLine][i].max === max){
            chosenOptions[currentLine].splice(i, 1);
            break;
        }
    }
    loadChosenOptionLabels();
}