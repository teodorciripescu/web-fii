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
            chosenOptions.push(obj);
        }
        loadChosenOptionLabels();
    }
}

function removeDropdownChosenOption(obj){
    for (let i = 0; i < chosenOptions.length; i++) {
        if(obj.key ===chosenOptions[i].key
            && obj.value === chosenOptions[i].value){
            chosenOptions.splice(i, 1);
            return true;
        }
    }
    return false;
}
