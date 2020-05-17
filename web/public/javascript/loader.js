function showLoader() {
    document.getElementById(loaderId).style.display = "block";
    console.log('load started');
}
function hideLoader(){
    document.getElementById("loader").style.display = "none";
    console.log('load ended');
}
async function loadDoc(category, inputId, selectId, loaderId) {
    const searchInput = document.getElementById(inputId).value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const res = JSON.parse(this.responseText);
            var options = '';
            for(var i = 0; i < res.length; i++) {
                options += "<option value='" + res[i] + "'>" + res[i] + "</option>";
            }
            document.getElementById(selectId).innerHTML = options;
        }
    };
    xhttp.onloadstart = function () {
        document.getElementById(inputId).classList.add('loading');
        //document.getElementById(loaderId).style.display = "block";
    };
    xhttp.onloadend = function () {
        document.getElementById(inputId).classList.remove('loading');
        //document.getElementById(loaderId).style.display = "none";
    };
    xhttp.open("GET", `/api/categories/suggestion?category=${category}&input=${searchInput}`, true);
    xhttp.send();
}