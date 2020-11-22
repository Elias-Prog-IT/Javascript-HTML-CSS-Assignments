
/*
   @author: Elias Posluk
   Student-id: poel20ty
   Uppgift: Inloggningssida
   @date 10/09/2020
   
*/
'use strict'

//const app har variabeln count som håller 
//koll på antal inloggningsförsök
const app = {
    constUserName: "test",
    constUserPassword: "1234"
};
//Kollar om man är inloggad sedan innan eller inte. 
//Om man är inloggad så hamnar man kvar i loginpage, vilket kallar på insideWelcomePage funktionen
//Annars kallas firstPageLogin funktionen.
//Allt detta görs med att längden på localstorage.
if (localStorage.length === 2) {
    insideWelcomePage();
}
else {
    firstPageLogin();
}

//Tömmer localstorage när funktionen deleteStorage kallas
function deleteStorage() {
    localStorage.clear();
    console.log(localStorage);
}

function insideWelcomePage() {
    document.body.innerHTML = "<h1 id = insideWelcome >Välkommen in! Du är nu inloggad!</h1>";
    document.body.insertAdjacentHTML("beforeend", "<div> <button id = 'loggoutButton'> Sign out </button></div>");

    let loggoutButton = document.getElementById("loggoutButton");
    loggoutButton.addEventListener("click", function () {
        deleteStorage();
        console.log(localStorage);
        firstPageLogin();
        console.log(localStorage);
    });
}
//Första sidan, där man får skriva in login-uppgifterna 
function firstPageLogin() {
     //Tömmer sidan helt
    document.body.innerHTML = "";
    //Tar emot inputen från användaren
    document.body.insertAdjacentHTML("afterbegin", '<h1 id = firstPage> Skriv in dina uppgifter i rutorna nedanför. </h1> Name: <input type="text" id="user" placeholder="Type username here"> Password: <input type="password" id="password" placeholder="Type password here"> <button id="spara"> Login</button>');
    let loginButton = document.getElementById("spara");

    //Login knappen som känner av om man har skrivit in rätt eller fel input, då blir man
    //Skickad till respektive funktion, antingen errorPage, eller till insideWelcomePage.
    loginButton.addEventListener("click", function () {

        const constName = user.value;
        const constPass = password.value;

        if (constName == app.constUserName && constPass == app.constUserPassword) {
            localStorage.setItem("user", constName);
            localStorage.setItem("password", constPass);

            insideWelcomePage();
        }
        else {
            errorPage();
        }
    });

//Om man skriver in fel uppgifter eller inte skriver in uppgifter alls 
// in i parametern så kallas errorPage funktionen där man får feedbacken att 
//Något blev fel och att man ska försöka igen, klickar användaren på "Try again!" 
//Så skickas man tillbaka till första sidan men funktionskallelsen firstPageLogin();
    function errorPage() {
        document.body.innerHTML = "<h1>Något blev fel här, prova igen!</h1>";
        document.body.insertAdjacentHTML("beforeend", "<div><button id = 'retryButton'> Try again! </button></div>");
        let retryButton = document.getElementById("retryButton");

        retryButton.addEventListener("click", function () {
            firstPageLogin();
        });
    }
}