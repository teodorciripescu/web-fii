function selectedDropdown(category, selectId) {
    const selectedValue = document.getElementById(selectId).value;
    const obj = {
        key: category,
        category_type: 'dropdown',
        value: selectedValue
    }
    const unwantedValue = document.getElementById(category + 'SelectOption').value;
    if(selectedValue !== unwantedValue) {
        if(!removeDropdownChosenOption(obj)){
            chosenOptions[currentLine].push(obj);
        }
        loadChosenOptionLabels();
    }
}

function removeDropdownChosenOption(obj){
    for (let i = 0; i < chosenOptions[currentLine].length; i++) {
        if(obj.key ===chosenOptions[currentLine][i].key
            && obj.value === chosenOptions[currentLine][i].value){
            chosenOptions[currentLine].splice(i, 1);
            return true;
        }
    }
    return false;
}
