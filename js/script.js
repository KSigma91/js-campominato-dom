/* 
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba
BONUS possibili:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/


//debugger;
// seleziono gli elementi
const selezioneDiff = document.getElementById("selection");
const generaBtn = document.querySelector("button");
const generazioneGriglia = document.getElementById("grid");

// l'utente avrà a disposizione tre difficoltà: facile, medio, difficile. Una volta scelto verranno generate le celle
const generaCelle = (classeDiv) => {
    
    // creo l'elemento "div" per poi inserire la classe "square"
    const box = document.createElement("div");
    box.className = classeDiv;
    return box;

}

// in base alla difficoltà scelta, genero una griglia che conterrà le celle e il giocatore potrà fare la sua partita
generaBtn.addEventListener("click",

    () => {
        let numeroCelle, classeCelle;

        // svuota griglia
        generazioneGriglia.innerHTML = "";

        // riferimento al valore della selezione livello
        const sceltaLivello = selezioneDiff.value;
        console.log(sceltaLivello);

        switch (sceltaLivello) {

            case "facile":
            default:
                numeroCelle = 100;
                classeCelle = "square_facile";
                break;

            case "medio":
                numeroCelle = 81;
                classeCelle = "square_medio";
                break;

            case "difficile":
                numeroCelle = 49;
                classeCelle = "square_difficile";
                break;
                
        }

        // generiamo dei numeri random con un range minimo e massimo
        const generaNumeri = numeriRandom (numeroCelle, 1, numeroCelle);
        console.log(generaNumeri);

        for (let i = 0; i < generaNumeri.length; i++){

            // i numeri generati saranno inseriti nelle celle 
            const elementiSquare = generaCelle(classeCelle);
            let valoriCella = generaNumeri[i];
            elementiSquare.addEventListener("click",

                function(){
                    this.append(valoriCella)
                    if (PariDispari(valoriCella) === "pari"){
                        this.classList.add("num_pari");
                    } else {
                        this.classList.add("num_dispari");
                    }
                }

            )
            generazioneGriglia.append(elementiSquare);

        }
    }

);

function numeriRandom (numeriLista, min, max){

    const numeriInt = [];
    while (numeriInt.lenght < numeriLista){
        let numeriIntRandom = numeriRandomMinMax(min, max);
        if (!numeriInt.includes(numeriIntRandom)){
            numeriInt.push(numeriIntRandom);
        }
    }
    return numeriInt;

}



// ogni cella conterrà un numero con un range direttamente proporzionale alla difficoltà scelta
function genNumeriRandom (rangeMin, rangeMax){

    let genRandom = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
    return genRandom;

}

// funzione pari o dispari
function PariDispari (numeroCheck){

    let risultato;
    if (numeroCheck % 2 === 0){
        risultato = "pari";
    } else {
        risultato = "dispari";
    }
    return risultato;
}