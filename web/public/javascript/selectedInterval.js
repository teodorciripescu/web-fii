function selectedInterval(category, min, max) {
    const minValue = document.getElementById('min' + category + 'Input').value;
    const maxValue = document.getElementById('max' + category + 'Input').value;
    let obj = {
        key: category,
        category_type: 'interval',
        min: minValue,
        max: maxValue
    };
    if(category==='start_time'||category==='end_time'||category==='weather_timestamp'){
        if(!removeIntervalChosenOption(obj)) {
            chosenOptions.push(obj);
        }
        loadChosenOptionLabels();
    } else {
        if(isNaN(obj.min) || isNaN(obj.max)){
            alert('Please give valid numbers to the interval.');
        }
        else{
            obj.min = parseFloat(obj.min);
            obj.max = parseFloat(obj.max);
            min = parseFloat(min);
            max = parseFloat(max);
            if(obj.min < min || obj.max > max){
                alert('Please give values between '+ min + ' and ' + max + '.  ' + obj.min + ', '+ obj.max);
            }
            else if (obj.min > obj.max){
                alert('Please give a valid interval.');
            }
            else{
                if(!removeIntervalChosenOption(obj)) {
                    chosenOptions.push(obj);
                }
                loadChosenOptionLabels();
            }
        }
    }
}
function removeIntervalChosenOption(obj){
    for (let i = 0; i < chosenOptions.length; i++) {
        if(obj.key ===chosenOptions[i].key
            && obj.min === chosenOptions[i].min && obj.max === chosenOptions[i].max){
            chosenOptions.splice(i, 1);
            return true;
        }
    }
    return false;
}