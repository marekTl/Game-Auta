const hrac1 = document.querySelector(".cerveneAuto");
const hrac2 = document.querySelector(".zeleneAuto");
const draha = document.querySelector(".draha");
const krok = 30;

// Získání rozměrů herní plochy
const souradniceHriste = draha.getBoundingClientRect(); //kde jsem na stránce na dráze
//  nastaví šířky 
const sirkaHriste1 = souradniceHriste.right - hrac1.clientWidth - draha.offsetLeft;
const sirkaHriste2 = souradniceHriste.right - hrac2.clientWidth - draha.offsetLeft;

//skore
let skoreHrace1 = 0;
let skoreHrace2 = 0;

// Nastavení počáteční pozice auta
let plocha1 = 0;
let plocha2 = 0;

// Funkce reset hráčů
function resetHraci() {
    plocha1 = 0;
    plocha2 = 0;
    hrac1.style.left = plocha1 + "px";
    hrac2.style.left = plocha2 + "px";
}

// Funkce pro aktualizaci zobrazení skóre
function aktualizaceSkore() {
    const skoreHrace1Element = document.querySelector(".skore-hrace1");
    const skoreHrace2Element = document.querySelector(".skore-hrace2");
    skoreHrace1Element.textContent = skoreHrace1;
    skoreHrace2Element.textContent = skoreHrace2;
}

// skore do třech vítězství
function konecHry() {
    if (skoreHrace1 === 3) {
        skoreHrace1 = 0;
        skoreHrace2 = 0;
        alert("Vyhrálo červené auto gratulace");
    } else if (skoreHrace2 === 3) {
        skoreHrace1 = 0;
        skoreHrace2 = 0;
        alert("Vyhrálo zelené auto gratulace");
    }
}

//funkce pro odpocitávání 
const odpocitavaniElement = document.querySelector(".odpocitavani");
let probihaOdpocet = true;

setTimeout(startHry, 2000);
function startHry() {
    odpocitavaniElement.innerHTML = "go!";
    probihaOdpocet = false;
}

setTimeout(odstranGo, 1000);
function odstranGo() {
    odpocitavaniElement.innerHTML = "";
    probihaOdpocet = true;
}

window.addEventListener("keyup", function (event) {
    if (!probihaOdpocet) {

        if (event.key === "y") {
            //pohyb hráče, ale je omezen na šířku hřiště
            plocha1 = Math.min(plocha1 + krok, sirkaHriste1);
            //horizontání pozice prvku na stránce, pohyb hráče v px
            hrac1.style.left = plocha1 + "px";

            if (plocha1 >= sirkaHriste1) {
                if (plocha2 >= sirkaHriste2) {
                    alert("Remíza! Oba hráči získávají bod. \n" + (skoreHrace1 + 1) +  ":" + (skoreHrace2 + 1));
                    skoreHrace1 += 1;
                    skoreHrace2 += 1;
                } else {
                    alert("Červené Auto získává bod! \n " + (skoreHrace1+ 1) +  ":" + skoreHrace2);
                    skoreHrace1 += 1;
                    setTimeout(startHry, 2000);
                }
                resetHraci();
                odstranGo();
            }
        }

        if (event.key === "-") {
            plocha2 = Math.min(plocha2 + krok, sirkaHriste2);
            hrac2.style.left = plocha2 + "px";

            if (plocha2 >= sirkaHriste2) {
                if (plocha1 >= sirkaHriste1) {
                    alert("Remíza! Oba hráči získávají bod. \n" + (skoreHrace2 + 1) +  ":" + (skoreHrace1 + 1));
                    skoreHrace2 += 1;
                    skoreHrace1 += 1;
                } else {
                    alert("Zelené Auto získává bod! \n " + skoreHrace1 + ":" + (skoreHrace2 + 1));
                    skoreHrace2 += 1;
                    setTimeout(startHry, 2000);
                }
                resetHraci();
                odstranGo();
            }
        }
    }
    aktualizaceSkore();
    konecHry();
});



