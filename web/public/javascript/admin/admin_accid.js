
/*pot extrage numele coloanelor utilizand un query: select column_name from INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'nume_tabel'
dar nu are sens
*/

///extract page
var page=1;
var adresa=document.URL;

var url = document.createElement('a');
url.href =adresa;
page=url.pathname;


var n=page.indexOf("=");
page=page.substring(n+1);
var raw = JSON.stringify({ "page": page});

var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
};

var ok = fetch("http://localhost:3000/api/admin/accid", requestOptions)
    .catch(error => console.log('error', error));



var coloane=["id",
    "source",        "tmc",        "severity",        "start_time",        "end_time",        "start_lat",
    "start_lng",        "end_lat",        "end_lng",        "distance",        "description",        "number",        "street",        "side",        "city",        "county",        "state",        "zipcode",        "country",
    "timezone",        "airport_code",        "weather_timestamp",
    "temperature",        "wind_chill",        "humidity",        "pressure",
    "visibility",        "wind_direction","wind_speed","precipitation","weather_condition","amenity","bump","crossing","give_way","junction","no_exit","railway","roundabout","station","stop","traffic_calming","traffic_signal","turning_loop","sunrise_sunset","civil_twilight","nautical_twilight","astronomical_twilight"
];



var tabel=document.getElementById("tabelul");
var tabelhead=document.getElementById("headul");
var tabelbody=document.getElementById("bodyul");
var tabelrow=document.getElementById("rowul");

for(var i=0;i<coloane.length;i++)
{let cap_tabel=document.createElement("th");
    cap_tabel.innerText=coloane[i];
    cap_tabel.className="responssive_tabel";
    if(coloane[i]==='description')
        cap_tabel.innerText="situation_description";


    tabelrow.appendChild(cap_tabel);}
tabelhead.appendChild(tabelrow);
tabel.appendChild(tabelhead);


///vom crea 100 de randuri

for(var i=0;i<100;i++)
{    tabelrow=document.createElement("tr");
    tabelrow.id=i;
    //   tabelrow.style.background_color="red";
    tabelbody.appendChild(tabelrow);
    tabel.appendChild(tabelbody);
}


let celula_tabel;
var m,p,elem;

ok.then(x=> {
    x.json().then(y=>{

        obj=y.rezultat;


        for(var j=0;j<coloane.length;j++)
        {m=p=0;

            for(var i=1;i<=100;i++){
                var cautat1='"'+coloane[j]+'"';
                var cautat2='"'+coloane[j+1]+'"';


                m=obj.indexOf(cautat1,m+coloane[j].length);

                if(j!==coloane.length-1){
                    p=obj.indexOf(cautat2,p+coloane[j+1].length);

                    m=m+coloane[j].length+4;
                    p=p-2;
                    elem=obj.substring(m,p);
                }
                else
                {
                    m=m+coloane[j].length+4;
                    p=m+5;
                    p=p-2;
                    elem=obj.substring(m,p);
                }


                celula_tabel=document.createElement("td");
                celula_tabel.innerText=elem;
                celula_tabel.className="responssive_tabel";

                tabelrow=document.getElementById(i-1);
                tabelrow.appendChild(celula_tabel);


            }}

    })});




var urm_pg=parseInt(page)+1;
var ant_pg=parseInt(page)-1;

function inainte() {


    location.href="http://localhost:3000/admin/accid/id="+urm_pg;
}

function inapoi() {
    //trimitere la alta pagina ce contine pagina urmatoare cu rezultate

    if(page>1)
        location.href="http://localhost:3000/admin/accid/id="+ant_pg;
    else
        alert("There is no previous page");
}