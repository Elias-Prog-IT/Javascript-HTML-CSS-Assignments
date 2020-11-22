'use strict'
/*
    @author: Elias Posluk
	  Student-id: poel20ty
    Uppgift: Städer och Länder
    @date 30/09/2020
*/ 



//första fetchen för att läsa in land.json, skriver ut lådan för länder när
//användaren ska välja land
fetch("land.json")
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        "Looks like we found a bug on first fetch land.json. Status code: " +
          response.status
      );
      return;
    }

    response.json().then(function (data) {
      $("#countries").append("<div> <b> <u> Länder </u> </b> </div>");

      $.each(data, function (key, value) {
        $("#countries").append(
          JSON.stringify(
            "<div><a onclick = get_cities(" +
              value.id +
              ")>" +
              value.countryname +
              "</a></div>",
            undefined,
            2
          )
        );
      });
      $("#countries").append("<br><br>");
    });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });

//funktion för att hämta hem stadsnamn 
function get_cities(id) {
  $("#cityinfo").css("display", "none");
  fetch("stad.json")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like we found a bug on fetch stad.json in get_cities function. Status Code: " +
            response.status
        );
        return;
      }
      response.json().then(function (data) {
        $("#cities").css("display", "block");
        $("#cities").empty();
        $("#cities").append("<div> <b> <u> Stadsnamn </u> </b> </div>");
        $.each(data, function (key, value) {
          if (value.countryid == id) {
            $("#cities").append(
              JSON.stringify(
                "<div><a onclick = get_city_info(" +
                  value.id +
                  ")>" +
                  value.stadname +
                  "</a></div>",
                undefined,
                2
              )
            );
          }
        });
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}
//Hämtar hem information om staden, stadsnamn, landet och befolkningsmängd
function get_city_info(id) {
  fetch("stad.json")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like we found a bug on fetch stad.json in get_city_info function. Status code: " +
            response.status
        );
        return;
      }

      response.json().then(function (data) {
        $("countryname").empty();

        $("#cityinfo").css("display", "block");
        $("#cityinfo").empty();
        $("#cityinfo").append(
          "<div> <b> <u> Stadsinformation </u> </b> </div>"
        );

        $.each(data, function (key, value) {
          if (value.id == id) {
            get_country_name(value.countryid);
            //Skriver ut i "stadinformation" lådan med stadsnamn, Land och befolkning
            $("#cityinfo").append(
              JSON.stringify(
                "<div> Stadsnamn: " +
                  value.stadname +
                  " <br>Land: <countryname></countryname> <br>Befolkning: " +
                  value.population +
                  "&nbsp;&nbsp;&nbsp;&nbsp; <button onclick=mark_city_as_visited(" +
                  value.id +
                  "," +
                  value.population +
                  ")> Besökt </button> </div>",
                undefined,
                2
              )
            );
          }
        });
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}
//Funktionaliteten hämtar hem landets namn från json-filen
function get_country_name(id) {
  fetch("land.json")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like we found a bug on fetch land.json in get_country_name function. Status code: " +
            response.status
        );
        return;
      }

      response.json().then(function (data) {
        $("countryname").empty();

        $.each(data, function (key, value) {
          if (value.id == id) {
            $("countryname").append(
              JSON.stringify(value.countryname, undefined, 2)
            );
          }
        });
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

//Funktionaliteten hämtar hem stadsnamnet från json-filen och
//Här kollar vi om man har redan besökt staden eller ej med if-satsen
function get_city_name(id, population) {
  fetch("stad.json")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like we found a bug on fetch stad.json in get_city_name function. Status code: " +
            response.status
        );
        return;
      }

      response.json().then(function (data) {
        $.each(data, function (key, value) {
          if (value.id == id) {
            if (localStorage.hasOwnProperty("visited_city") == true) {
              if (
                localStorage.getItem("visited_city").includes(value.stadname) ==
                false
              ) {
                localStorage.setItem(
                  "visited_city",
                  localStorage.getItem("visited_city") + ", " + value.stadname
                );
                localStorage.setItem(
                  "interactWith",
                  parseInt(localStorage.getItem("interactWith")) + population
                );
              }
            } else {
              localStorage.setItem("visited_city", value.stadname);
              localStorage.setItem("interactWith", population);
            }
          }
        });
        location.replace("index.html");
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

//När man klickar på knappen "besökt" i funktionen "get_city_info" så kallas denna funktion som markerar
//vilken stad/städer man har besökt.
function mark_city_as_visited(cityname, citypopulation) {
  // Kollar om man har rätt webbläsare
  if (typeof Storage !== "undefined") {
    get_city_name(cityname, citypopulation);
  } else {
    document.getElementById("visited_cities").innerHTML =
      "Sorry, your browser does not support Web Storage...";
  }
}

//funktion för besökta städer
function visitedcities() {
  $("#visited_cities").empty();
  $("#total_people_met").empty();

  document.getElementById("visited_cities").innerHTML =
    "Antalet besökta städer är: " + localStorage.getItem("visited_city");
  document.getElementById("total_people_met").innerHTML =
    "Kombinerad befolkning som du har stött på: " +
    localStorage.getItem("interactWith");
}

//Rensar localstorage
function delete_history() {
  localStorage.removeItem("visited_city");
  localStorage.removeItem("interactWith");
  location.replace("index.html");
}
