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
        chosenOptions.push(obj);
        loadChosenOptionLabels();
    } else {
        removeSimpleChosenOption(obj);
        loadChosenOptionLabels();
    }
}
function removeSimpleChosenOption(obj){
    for (let i = 0; i < chosenOptions.length; i++) {
        if(obj.key ===chosenOptions[i].key && obj.value === chosenOptions[i].value){
            chosenOptions.splice(i, 1);
            return;
        }
    }
}