// var oContent = document.getElementById('DynamicContent');
// legatura();
loadNews();
///facem trimitere la baza de date -tabela: posts si extragem ultimele 5 postari si le afisam

async function loadNews() {
    var ok = await fetch("/api/start")
        .catch(error => console.log('error', error));


    console.log(ok);
    ok.json().then(x => {
        let obj = x.data.rezultat;
        var newsDiv = document.getElementById('latest-news');
        var news = '';
        for (let i = 0; i < obj.length; i++) {
            news += `<header><h2>Admin post ${i+1}</h2></header><section><p>${obj[i]}</p></section>`;
        }
        newsDiv.innerHTML = news;
    });
}

async function legatura() {

    ///mereu stergem tot ce era
    oContent.innerHTML="";

    //GET request- dorim optinerea posturilor din tabela
    var ok = await fetch("http://localhost:3000/api/start")
        .catch(error => console.log('error', error));


    console.log(ok);
    ok.json().then(x=> {
        let obj = x.data.rezultat;




        ////DESCRIPTION
        let description_div=document.createElement("div");
        let description_head=document.createElement("p");


        description_div.style.width="80em";
        description_div.style.position="relative";

        description_head.innerText="Car accidents occur every day in the United States.\n" +
            "Whether it is the drivers, the authorities, the pedestrians or the simple escapes of the senses, the accidents continue to take place with an alarming rate.\n" +
            "In order to learn from the mistakes of others, to study human behaviour or to satisfy simple morbid curiosities,\n" +
            " we present to you the AVI application - here to provide you with statistics, raw data, maps, a whole variety of methods to view all your interests.";

        description_head.style.textAlign="justify";
        description_head.style.textJustify="inter-word";
        description_div.appendChild(description_head);

        let div=document.createElement("div");
        div.style.width="95%";
        div.style.position="relative";


        ////WELCOME BRIDGE
        let welcome_div=document.createElement("div");
        let welcome_head=document.createElement("h1");
        welcome_head.innerText="Welcome";
        welcome_div.padding="10px";
        welcome_head.padding="8px";

        let ornament1=document.createElement("img");
        ornament1.src="/images/Fine_Ornament_Black_L.png";
        let ornament2=document.createElement("img");
        ornament2.src="/images/Fine_Ornament_Black_R.png";
        ornament1.className="ornamented-text-flex";
        ornament2.className="ornamented-text-flex";
        welcome_head.className="ornamented-text-flex";


        welcome_div.appendChild(ornament1);
        welcome_div.appendChild(welcome_head);
        welcome_div.appendChild(ornament2);
        oContent.appendChild(welcome_div);

        welcome_div.className="ornamented-text-container";
        welcome_div.style.width="250px";
        welcome_div.style.paddingLeft="20px";




        oContent.appendChild(description_div);
        oContent.appendChild(welcome_div);
        oContent.appendChild(div);


        ////POSTS

        for(let post of obj)
        {
            console.log(post);

            let paragraph=document.createElement("p");
            paragraph.innerText=post;

            paragraph.style.padding="7px";
            paragraph.style.font="18px";
            let paragraph_div=document.createElement("div");

            paragraph_div.style.borderBottom="solid 2px #F5F5F5";

            paragraph_div.style.paddingTop="5px";

            paragraph_div.className="paragraph-div";

            paragraph_div.className="posts";


            paragraph_div.appendChild(paragraph);
            div.appendChild(paragraph_div);
        }



        ///LIFE BRIDGE
        let life_div=document.createElement("div");
        let life_head=document.createElement("h1");
        let ornament3=document.createElement("img");
        ornament3.src="/images/Fine_Ornament_Black_L.png";
        let ornament4=document.createElement("img");
        ornament4.src="/images/Fine_Ornament_Black_R.png";
        ornament3.className="ornamented-text-flex";
        ornament4.className="ornamented-text-flex";
        life_head.className="ornamented-text-flex";


        life_head.innerText="Life Matters";
        life_div.appendChild(life_head);
        life_div.padding="10px";
        life_head.padding="8px";

        life_div.appendChild(ornament3);
        life_div.appendChild(life_head);
        life_div.appendChild(ornament4);
        oContent.appendChild(life_div);

        life_div.className="ornamented-text-container";



        ///IMAGES

        let div_imgs = document.createElement("div");
        div_imgs.className="flex-container";



        for(var i=2;i<=10;i++) {
            let div_img1 = document.createElement("div");
            let img1 = document.createElement("img");
            img1.src = "/images/"+i+".jpg";

            div_img1.className="div-resize";

            div_img1.appendChild(img1);

            div_imgs.appendChild(div_img1);
        }

        oContent.className="principal-flex-container";
        oContent.appendChild(div_imgs);


    });

}
