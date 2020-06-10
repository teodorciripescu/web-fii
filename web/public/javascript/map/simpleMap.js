
var map;
var markers = [];


(function(exports) {
    "use strict";

    function initMap() {
        exports.map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 41.85003,
                lng: -87.65005
            },
            zoom: 5,
            gestureHandling: 'greedy'
        });


        var shotButton=document.getElementById("shotButton");
        shotButton.innerText="Take a shot";
        shotButton.style.width="95px";
        shotButton.style.height="40px";
        shotButton.style.zIndex="10000";
        shotButton.style.position="absolute";
        shotButton.style.top="14%";
        shotButton.style.left="2%";



        //////////
        //notificari


        var n = 0;

        map.addListener('click', function (event) {
            if(n>0)clearMarkers();
            addMarker(event.latLng.toString(),1);
            n=1;

        });

    }

    function addMarker(location) {

        ////extragere lat si long
        var latit,long,m,p,coord,info=[];


        coord=location;

        m=coord.indexOf("(");
        p=coord.indexOf(",");
        latit=coord.substring(m+1,p-1);

        m=coord.indexOf(",");
        p=coord.indexOf(")");
        long=coord.substring(m+1,p-1);



        var marker = new google.maps.Marker({
            position:{
                lat:Number(latit),
                lng:Number(long)
            },
            map: map
        });
        markers.push(marker);



        map.setZoom(10);
        map.setCenter(marker.getPosition());

        ///intram in bd si extragem toate accidentele de pe o anume raza=sa zicem dif de 0,5 pct latitudine



        ///request api

        const limit=0.3;

        const raw = JSON.stringify({
            "latmax": Number(latit) + limit,
            "latmin": Number(latit) - limit,
            "lngmax": Number(long) + limit,
            "lngmin": Number(long) - limit
        });


        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        };
        var ok = fetch("http://localhost:3000/api/map",requestOptions)
            .catch(error => console.log('error', error));

        var coloane=["id",
            "source",        "tmc",        "severity",        "start_time",        "end_time",        "start_lat",
            "start_lng",        "end_lat",        "end_lng",        "distance",        "description",        "number",        "street",        "side",        "city",        "county",        "state",        "zipcode",        "country",
            "timezone",        "airport_code",        "weather_timestamp",
            "temperature",        "wind_chill",        "humidity",        "pressure",
            "visibility",        "wind_direction","wind_speed","precipitation","weather_condition","amenity","bump","crossing","give_way","junction","no_exit","railway","roundabout","station","stop","traffic_calming","traffic_signal","turning_loop","sunrise_sunset","civil_twilight","nautical_twilight","astronomical_twilight"
        ];

        for(var i=0;i<coloane.length;i++)
        {info.push([]);}


        ///extragere date raspuns


        var latits=[];
        var longs=[];

        var latits2=[];
        var longs2=[];

        var m,p,elem;


        ok.then(x=> {

            x.json().then(y => {

                var obj = y.rezultat;


                for (var j = 0; j < coloane.length; j++) {
                    m = p = 0;
                    //console.log(j);

                    for (var i = 1; i <= 25; i++) {
                        // console.log(m, p);
                        var cautat1 = '"' + coloane[j] + '"';
                        var cautat2 = '"' + coloane[j + 1] + '"';


                        m = obj.indexOf(cautat1, m + coloane[j].length);

                        if (j !== coloane.length - 1) {
                            p = obj.indexOf(cautat2, p + coloane[j + 1].length);

                            m = m + coloane[j].length + 4;
                            p = p - 2;
                            elem = obj.substring(m, p);
                        } else {
                            m = m + coloane[j].length + 4;
                            p = m + 5;
                            p = p - 2;
                            elem = obj.substring(m, p);
                        }


                        if (coloane[j] === "start_lat")
                        {latits.push(elem);
                            latits2.push(elem);}
                        if (coloane[j] === "start_lng")
                        {longs.push(elem);
                            longs2.push(elem);}

                        info[j].push(elem);

                    }
                }




                var shotButton=document.getElementById("shotButton");
                console.log(shotButton);
                shotButton.addEventListener("click",()=>mapShot(Number(latit),Number(long),latits2,longs2));




                let l1, l2,l;

                l=latits.length;

                ///adaugarea tuturor markerilor
                while(latits.length&&longs.length){

                    l1=latits.pop();
                    l2=longs.pop();


                    let marker2 = new google.maps.Marker({
                        position:{
                            lat:Number(l1),
                            lng:Number(l2)
                        },
                        map: map,
                        title: String(l-latits.length)
                    });

                    let ref='/accident?id='+info[0][Number(marker2.title)];

                    let text="<h4>id:"+info[0][Number(marker2.title)]+"</h4>"
                        +"description:" +info[11][Number(marker2.title)]
                        +"<p>severity:"+info[3][Number(marker2.title)]+"</p>"
                        +`<a href="${ref}">`+"more about it"+"</a>";




                    marker2.addListener('click', function() {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(text);

                        infoWindow.open(map,marker2);
                    });

                    markers.push(marker2);

                }

            })
        });


        setMapOnAll(map);
    }


    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    exports.initMap = initMap;
})((this.window = this.window || {}));




async function mapShot(lat, long, latits, longs) {
    let l1, l2;

    var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=10&size=1200x1000&maptype=roadmap";

    ///adaugarea tuturor markerilor
    while(latits.length&&longs.length){

        l1=latits.pop();
        l2=longs.pop();

        url=url+"&markers=color:blue%7C" +Number(l1)+","+Number(l2);
    }

    url = url + "&key=AIzaSyDKWEhbRSKA6_k2uA5f1jsHwV70nOmN-jk";

    ok = await fetch(url);

    console.log(ok.url);

}
