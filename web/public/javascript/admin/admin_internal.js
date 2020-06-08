var btn = document.getElementById("Continua");
btn.addEventListener("click", function(){
    credentials=[""];

    var nr=0;
    var creare=document.getElementById("creare");
    var stergere=document.getElementById("stergere");
    var all_input=document.getElementsByClassName("text_input");

    if(creare.checked){

        if(stergere.checked) {alert("ATENTIE! este permisa alegerea unei singure operatii simultan");
            return;
        }
       // credentials.push("creare");

        for(i=0;i<all_input.length;i++){
            //  console.log("creare");
            if(all_input[i].value!==""){
                nr++;
                credentials.push(all_input[i].value);
                console.log(all_input[i].value);
            }
            else  console.log("null");

        }

        if(nr<2){alert("Nu ati introdus toate datele.\n Incercati din nou.");
        }

            else{
                console.log("creeez! vreau sa creez!");
                //caz favorabil
         creaza();
        }
    }
    else
    if(stergere.checked){
      //  credentials.push("stergere");
        // console.log("stergee");
        for(i=0;i<all_input.length;i++){
            if(all_input[i].value!=""){
                nr++;
                credentials.push(all_input[i].value);
                console.log(all_input[i].value);
            }
            else  console.log("null");

        }

        if(nr<1){alert("Nu ati introdus toate datele.\n Incercati din nou.");}//caz nefavorabil
            //caz favorabil
        else {
           // credentials.pop();
            credentials.push(" ");
            sterge();
            }


        }
    else {alert("alegerea unei operatii este obligatorie!"); }});

async function creaza() {

    console.log("credentials0:"+ credentials[1]);
    console.log("credentials1:"+ credentials[2]);

    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "username": credentials[1],
        "password": credentials[2]});

    var requestOptions = {
        method: 'POST',
        //   headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var ok = await fetch("http://localhost:3000/api/admin/internalInsert", requestOptions)
        .catch(error => console.log('error', error));

 /*   console.log(ok);
    console.log(ok.ok);
    console.log("aici");*/
  //  console.log(ok);
   // console.log(ok.json);
    let k=ok.json().then(data=>{alert(data.message)});
    console.log(k);
   // alert();
    //console.log(ok.success);
    return ok.ok;

}

async function sterge() {

    console.log("credentials0:"+ credentials[1]);
    console.log("credentials1:"+ credentials[2]);

    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "username": credentials[1],
        "password": " "});

    var requestOptions = {
        method: 'POST',
        //   headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var ok = await fetch("http://localhost:3000/api/admin/internalDelete", requestOptions)
        .catch(error => console.log('error', error));


    let k=ok.json().then(data=>{alert(data.message)});
    return ok.ok;

}

function ascundere(){
    console.log("am actionat ascundere");
    var stergere=document.getElementById("stergere");
    console.log(stergere.checked);
    if(stergere.checked){
        console.log("vreau sa te sterggggg");
        var input_parola=document.getElementsByClassName("input_parola")[0];
       input_parola.style.display="none";
       var parola=document.getElementsByClassName("parola")[0];
        parola.style.display="none";

    }
}

function aparitie(){
    console.log("am actionat ascundere");
    var creare=document.getElementById("creare");
    console.log(creare.checked);
    if(creare.checked){

        var input_parola=document.getElementsByClassName("input_parola")[0];
        input_parola.style.display="block";
        var parola=document.getElementsByClassName("parola")[0];
        parola.style.display="block";

    }
}