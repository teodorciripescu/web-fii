var chosenOptions = [];

function sendOptions(){
    console.log('sending options...');
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/data_queries', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            const res = JSON.parse(this.responseText);
            console.log(res);
        }
    }
    xhr.onloadstart = function () {
        document.getElementById('sendDataContainer').classList.add('loading');
    };
    xhr.onloadend = function () {
        document.getElementById('sendDataContainer').classList.remove('loading');
    };

    xhr.send(JSON.stringify(chosenOptions));
}

function loadChosenOptionLabels(){
    var labels = '';
    chosenOptions.sort((a,b)=>{return (a.category_type > b.category_type) ? 1:(a.category_type < b.category_type)? -1:0;});
    for (let i = 0; i < chosenOptions.length; i++) {
        let labelId;
        switch (chosenOptions[i].category_type) {
            case 'interval':
                labelId = chosenOptions[i].key + chosenOptions[i].min + chosenOptions[i].max + chosenOptions[i].category_type;
                labels += `<div id="${labelId}" class="chosen-option-label color-${chosenOptions[i].category_type}"><span onclick="deleteIntervalLabel('${labelId}','${chosenOptions[i].key}',${chosenOptions[i].min},${chosenOptions[i].max})" class="remove-label">&times;</span>${chosenOptions[i].key}: (${chosenOptions[i].min}, ${chosenOptions[i].max})</div>`;
                break;
            default:
                labelId = chosenOptions[i].value + chosenOptions[i].key + chosenOptions[i].category_type;
                labels += `<div id="${labelId}" class="chosen-option-label color-${chosenOptions[i].category_type}"><span onclick="deleteLabel('${labelId}','${chosenOptions[i].key}','${chosenOptions[i].value}')" class="remove-label">&times;</span>${chosenOptions[i].key}: ${chosenOptions[i].value}</div>`;
        }
    }
    document.getElementById('chosenOptionsLabels').innerHTML = labels;
    console.log(chosenOptions);
}

function deleteLabel(labelId, key, value){
    for (let i = 0; i < chosenOptions.length; i++) {
        if(chosenOptions[i].key === key && chosenOptions[i].value === value){
            chosenOptions.splice(i, 1);
            break;
        }
    }
    loadChosenOptionLabels();
}

function deleteIntervalLabel(labelId, key, min, max){
    for (let i = 0; i < chosenOptions.length; i++) {
        if(chosenOptions[i].key === key && chosenOptions[i].min === min && chosenOptions[i].max === max){
            chosenOptions.splice(i, 1);
            break;
        }
    }
    loadChosenOptionLabels();
}