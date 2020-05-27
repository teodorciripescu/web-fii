


var i;
var credentials=[""];
var nr=0;

///actionare buton pt generare statistici
var btn = document.getElementById("Continua");
btn.addEventListener("click", finalcredentials);

function finalcredentials(){

    credentials=[""];

    var nr=0;
    var all_input=document.getElementsByClassName("text_input");

    for(i=0;i<all_input.length;i++){
        if(all_input[i].value!=""){
            nr++;
            credentials.push(all_input.value);
            console.log(all_input[i].value);
        }
         else  console.log("null");

    }

    if(nr!==2)alert("Nu ati introdus toate datele.\n Incercati din nou.");
}




