var i;
var credentials;

///actionare buton pt generare statistici
var btn = document.getElementById("Continua");
btn.addEventListener("click", finalcredentials);

async function finalcredentials(){

    credentials=[];

    var all_input=document.getElementsByClassName("text_input");

    for(i=0;i<all_input.length;i++){
        if(all_input[i].value!==""){
            credentials.push(all_input[i].value);
        }
    }

    if(credentials.length!==2)alert("Please fill all fields.");
    else{
        console.log(credentials);
        const loginResult = await loginApiCall(credentials);
        if(loginResult.status === 200){
            setCookie('authToken', loginResult.token, 30);
            alert('You logged in successfully!');
            window.location.href = '/';
            //console.log(loginResult);
        } else{
            alert('Something went wrong with your login! Please try again.');
        }
    }
}

function loginApiCall(credentials){
    return new Promise(resolve => {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/auth/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                const res = JSON.parse(this.responseText);
                resolve(res);
            }
        }
        xhr.send(JSON.stringify({username:credentials[0], password: credentials[1]}));
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

