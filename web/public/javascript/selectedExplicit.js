function selectedExplicit(category, inputId) {
    const selectedValue = document.getElementById(inputId).value;
    const obj = {
        key: category,
        category_type: 'explicit',
        value: selectedValue
    }
    if(!removeExplicitChosenOption(obj)) {
        chosenOptions[currentLine].push(obj);
        loadChosenOptionLabels();
    }
}

function removeExplicitChosenOption(obj){
    for (let i = 0; i < chosenOptions[currentLine].length; i++) {
        if(obj.key ===chosenOptions[currentLine][i].key
            && obj.value === chosenOptions[currentLine][i].value){
            chosenOptions[currentLine].splice(i, 1);
            return true;
        }
    }
    return false;
}