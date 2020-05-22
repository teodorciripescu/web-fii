function addLine(){
    var lineSelect = document.getElementById('lineSelect');
    lineSelect.innerHTML += `<option  value="${chosenOptions.length}">Line ${chosenOptions.length + 1}</option>`;
    chosenOptions.push([]);
    currentLine = chosenOptions.length - 1;
    lineSelect.value=currentLine;
    lineChanged();
}

function lineChanged() {
    currentLine = document.getElementById('lineSelect').value;
    loadChosenOptionLabels();
    lineChangedSelectChosenOptions();
    console.log(currentLine);
}

function resetAllLines(){
    for (let i = 0; i < chosenOptions.length; i++) {
        for (let j = 0; j < chosenOptions[i].length; j++) {
            if(chosenOptions[i][j].category_type === 'simple'){
                const checkboxId = chosenOptions[i][j].value + chosenOptions[i][j].key + 'Checkbox';
                document.getElementById(checkboxId).checked = false;

            }
        }
    }

    var lineSelect = document.getElementById('lineSelect');
    lineSelect.innerHTML = `<option  value="0">Line 1</option>`;
    chosenOptions = [[]];
    currentLine = 0;
    loadChosenOptionLabels();
    console.log(currentLine);
}