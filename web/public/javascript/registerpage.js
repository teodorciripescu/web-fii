
//<i class="fa fa-thumbs-up" aria-hidden="true"></i>
//  <i class="fa fa-thumbs-down" aria-hidden="true"></i>
///actionare buton pt trimitere date
let btn = document.getElementById("Done");


//verificare date email inainte de apasarea butonului si verificare corectitudinii tuturor datelor
let name=document.getElementById("name");
btn.addEventListener("click", finalcredentials);
name.addEventListener("mouseout", function validationName(){
    if (name.value.length > 10) {
        document.getElementById("name").style.color="red";
    }
    if (name.value.length <= 10) {
        document.getElementById("name").style.color="#262635";
    }
});


//verificare date email inainte de apasarea butonului si verificare corectitudinii tuturor datelor
let email=document.getElementById("email");
email.addEventListener("mouseout", function validationEmail(){
    var carcalac = document.getElementById("email").value.indexOf("@");
    // var punct = document.getElementById("email").value.indexOf(".");
    if (carcalac == -1) {
        document.getElementById("email").style.color="red";
    }
    else {
        // if(punct-carcalac>1)
        //document.getElementById("email").style.color="red";
        // else
        document.getElementById("email").style.color="#262635";
    }
});



var i;
var credentials=[""];


/*extragerea datele ce urmeaza trimise pe backend*/

function finalcredentials(){
    credentials=[""];

    ////retinerea elementelor care sunt check document.getElementById("name").style.color="#262635";ed

    var all_input=document.getElementsByClassName("text_input");
    var nr=0;
    for(i=0;i<all_input.length;i++){
        if(all_input[i].value!==""){
            credentials.push(all_input[i].value);
            console.log(all_input[i].value);
            nr++;
        }

    }
    if(nr!==4)alert("You didn't introduce all necessary data. Try again;");

    if(validation())
        console.log("totul corect");

}


/*validarea tuturor datelor= la final sa fim siguri ca TOTUL e corect*/
function validation() {

    var carcalac = document.getElementById("email").value.indexOf("@");
    var name = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
    var confirm = document.getElementById("confirmpass").value;
    var ok= "true";
    if (name.length > 10) {
        alert("The name may have no more than 10 characters");
        ok= "false";
    }
    if (pass.length <8) {
        alert("The password may have no less than 8 characters");
        ok= "false";}

    if (confirm!=pass) {
        alert("Your password confirmation isn't the same as password");
        ok= "false";
    }

    if (carcalac == -1) {
        alert("Not a valid e-mail!");
        ok = "false";
    }
    if (ok == "false") {
        return false;
    }
}

