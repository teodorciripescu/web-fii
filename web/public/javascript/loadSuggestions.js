async function loadSuggestions(category, inputId, selectId) {
    const searchInput = document.getElementById(inputId).value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const res = JSON.parse(this.responseText);
            var options = `<option id="${category}SelectOption" value="no data">no data</option>`;
            for(var i = 0; i < res.length; i++) {
                options += "<option value='" + res[i] + "'>" + res[i] + "</option>";
            }
            document.getElementById(selectId).innerHTML = options;
            if(!res.length){
                document.getElementById(category + 'SelectOption').value = 'no options found';
                document.getElementById(category + 'SelectOption').innerText = 'no options found';
            }else{
            document.getElementById(category + 'SelectOption').value = 'options loaded';
            document.getElementById(category + 'SelectOption').innerText = 'options loaded';
            }
        }
    };
    xhttp.onloadstart = function () {
        document.getElementById(inputId).classList.add('loading');
    };
    xhttp.onloadend = function () {
        document.getElementById(inputId).classList.remove('loading');
    };
    xhttp.open("GET", `/api/categories/suggestion?category=${category}&input=${searchInput}`, true);
    xhttp.send();
}