function selectedExplicit(category, inputId) {
    const selectedValue = document.getElementById(inputId).value;
    const obj = {
        key: category,
        category_type: 'explicit',
        value: selectedValue
    }
    if(!removeExplicitChosenOption(obj)) {
        chosenOptions.push(obj);
        loadChosenOptionLabels();
    }
}

function removeExplicitChosenOption(obj){
    for (let i = 0; i < chosenOptions.length; i++) {
        if(obj.key ===chosenOptions[i].key
            && obj.value === chosenOptions[i].value){
            chosenOptions.splice(i, 1);
            return true;
        }
    }
    return false;
}