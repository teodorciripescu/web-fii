function selectedSimple(category, value) {
    let obj = {
        key: category,
        category_type: 'simple',
        value: value
    };
    //if(obj.value === 'true') obj.value = true;
    //if(obj.value === 'false') obj.value = false;

    var checkBox = document.getElementById(value + category + 'Checkbox');
    if (checkBox.checked === true){
        removeSimpleChosenOption(obj);
        chosenOptions[currentLine].push(obj);
        loadChosenOptionLabels();
    } else {
        removeSimpleChosenOption(obj);
        loadChosenOptionLabels();
    }
}
function removeSimpleChosenOption(obj){
    for (let i = 0; i < chosenOptions[currentLine].length; i++) {
        if(obj.key ===chosenOptions[currentLine][i].key && obj.value === chosenOptions[currentLine][i].value){
            chosenOptions[currentLine].splice(i, 1);
            return;
        }
    }
}

function lineChangedSelectChosenOptions(){
    for (let i = 0; i < chosenOptions.length; i++) {
        for (let j = 0; j < chosenOptions[i].length; j++) {
            if(chosenOptions[i][j].category_type === 'simple'){
                const checkboxId = chosenOptions[i][j].value + chosenOptions[i][j].key + 'Checkbox';
                document.getElementById(checkboxId).checked = false;

            }
        }
    }
    for (let j = 0; j < chosenOptions[currentLine].length; j++) {
        if(chosenOptions[currentLine][j].category_type === 'simple'){
            const checkboxId = chosenOptions[currentLine][j].value + chosenOptions[currentLine][j].key + 'Checkbox';
            document.getElementById(checkboxId).checked = true;

        }
    }
}