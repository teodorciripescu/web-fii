
var i;

///actionare buton pt generare statistici
var btn = document.getElementById("Continua");
btn.addEventListener("click", finalcredentials);

async function finalcredentials() {

    credentials = [""];

    var nr = 0;
    var all_input = document.getElementsByClassName("text_input");

    for (i = 0; i < all_input.length; i++) {
        if (all_input[i].value !== "") {
            nr++;
            credentials.push(all_input[i].value);
        } else console.log("null");


    }

    if (nr !== 2) alert("Nu ati introdus toate datele.\n Incercati din nou.");
    else {

        let ok = await valid();

        if (ok) {
            location.replace("http://localhost:3000/admin/manager");

        } else {
            location.replace("http://localhost:3000/admin");
        }
    }
}

async function valid() {


    var raw = JSON.stringify({ "username": credentials[1],
        "password": credentials[2]});

    var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };

    var ok = await fetch("http://localhost:3000/api/admin/login", requestOptions)
        .catch(error => console.log('error', error));

    await ok.json().then(data=>{

        let tkn=data.token;
        setCookie("adminToken",tkn,30);

    });

    return ok.ok;
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
