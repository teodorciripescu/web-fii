async function myFunction() {

    var username="default";
    var all_input = document.getElementById("text");
    var msg ;

    if (all_input.value !== "")
        msg=all_input.value;

    let ok = await legatura(username,msg);
    alert(ok);
}

async function legatura(username,msg) {

    var raw = JSON.stringify({"username":username, "message": msg});
    var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };
    var ok = await fetch("http://localhost:3000/api/admin/posts", requestOptions)
        .catch(error => console.log('error', error));

    return ok.ok;
}