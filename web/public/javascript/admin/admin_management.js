var btn = document.getElementById("Continua");
btn.addEventListener("click", function(){
    credentials=[""];

    var nr=0;
    var creare=document.getElementById("creare");
    var stergere=document.getElementById("stergere");
    var all_input=document.getElementsByClassName("text_input");

    if(creare.checked){

        if(stergere.checked) {alert("ATENTIE)! este permisa alegerea unei singure operatii simultan");
            return;
        }
        credentials.push("creare");

        for(i=0;i<all_input.length;i++){
            //  console.log("creare");
            if(all_input[i].value!==""){
                nr++;
                credentials.push(all_input.value);
                console.log(all_input[i].value);
            }
            else  console.log("null");

        }

        if(nr<2){alert("Nu ati introdus toate datele.\n Incercati din nou.");
        }}
    else
    if(stergere.checked){
        credentials.push("stergere");
        // console.log("stergee");
        for(i=0;i<all_input.length;i++){
            if(all_input[i].value!=""){
                nr++;
                credentials.push(all_input.value);
                console.log(all_input[i].value);
            }
            else  console.log("null");

        }

        if(nr<1){alert("Nu ati introdus toate datele.\n Incercati din nou.");


        }}
    else {alert("alegerea unei operatii este obligatorie!"); }});