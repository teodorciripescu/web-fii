
//<i class="fa fa-thumbs-up" aria-hidden="true"></i>
//  <i class="fa fa-thumbs-down" aria-hidden="true"></i>
///actionare buton pt trimitere date
let btn = document.getElementById("Done");


//verificare date email inainte de apasarea butonului si verificare corectitudinii tuturor datelor
let name=document.getElementById("name");
btn.addEventListener("click", finalcredentials);
name.addEventListener("mouseout", function validationName(){
    if (name.value.length > 40) {
        document.getElementById("name").style.color="red";
    }
    if (name.value.length <= 40) {
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


/*extragerea datele ce urmeaza trimise pe backend*/

async function finalcredentials(){
    let credentials = [];

    var all_input=document.getElementsByClassName("text_input");

    for(i=0;i<all_input.length;i++){
        if(all_input[i].value !== ""){
            credentials.push(all_input[i].value);
        }
    }
    if(credentials.length !== 4){
        alert("You didn't introduce all necessary data. Try again;");
    } else{
        if(validation()) {
            const registerResult = await registerApiCall(credentials);
            if(registerResult.status === 201){
                setCookie('authToken', registerResult.token, 30);
                //console.log(registerResult);
                alert('You registered successfully!');
                window.location.href = '/';
            } else{
                alert('Something went wrong with your registration! Please try again.');
            }
        }
    }
}

function registerApiCall(credentials){
    return new Promise(resolve => {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/auth/register', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                const res = JSON.parse(this.responseText);
                resolve(res);
            }
        }
        xhr.send(JSON.stringify({username:credentials[0], password: credentials[1], email:credentials[3]}));
    });
}

function setCookie(name, value, days) {
    let cookie = `${name}=Bearer ${value}`;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        cookie += `; expires=${date.toUTCString()}; path=/`;
    }
    document.cookie = cookie;
}

/*validarea tuturor datelor= la final sa fim siguri ca TOTUL e corect*/
function validation() {

    var carcalac = document.getElementById("email").value.indexOf("@");
    var name = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
    var confirm = document.getElementById("confirmpass").value;
    var ok= true;
    if (name.length > 40) {
        alert("The name may have no more than 40 characters");
        ok= false;
    }
    if (pass.length <8) {
        alert("The password may have no less than 8 characters");
        ok= false;
    }

    if (confirm!==pass) {
        alert("Your password confirmation isn't the same as password");
        ok= false;
    }

    if (carcalac === -1) {
        alert("Not a valid e-mail!");
        ok = false;
    }

    return ok;
}

