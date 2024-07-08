const cardsArray = ['4H.svg', '3D.svg', '9S.svg', '2H.svg', '6S.svg', 'KC.svg', 'TC.svg', '5H.svg', '3S.svg', '7D.svg', 'JC.svg', 'JD.svg', 'AS.svg', 'TH.svg', '8C.svg', '6C.svg', '2D.svg', 'KD.svg', '4D.svg', 'KH.svg', '9H.svg', '3H.svg', '9C.svg', 'AD.svg', 'QC.svg', '7S.svg', '9D.svg', 'AH.svg', '8D.svg', 'JS.svg', '6D.svg', 'KS.svg', '5S.svg', 'TD.svg', '4C.svg', 'QS.svg', '2S.svg', '7C.svg', 'QD.svg', 'JH.svg', '8S.svg', 'AC.svg', '4S.svg', 'TS.svg', '5C.svg', '2C.svg', '5D.svg', '8H.svg', '3C.svg', 'QH.svg', '7H.svg', '6H.svg']

const discardedCards = [];
const curCards = [];
const dCards = [];

let curScore = 0;
let dealerScore = 0;


const hit_btn = document.getElementById("hit-btn");
hit_btn.addEventListener("mousedown", () => {
    addCard("user");
})

function updateScore(target) {
    if (target === "user") {
        let numA = 0;
        curScore = 0;
        for (let i in curCards) {
            let firstChar = curCards[i].split("")[0];
            if (firstChar === "A") {
                numA++
                continue;
            }
            if (isFinite(firstChar)) {
                curScore += Number(firstChar);
                continue;
            }
            curScore += 10;
        }
        curScore += numA * 1;
        while (numA > 0 && curScore + 10 <= 21) {
            curScore += 10;
            numA--;
        }
        const scoreTitle = document.getElementById("score-title");
        scoreTitle.innerText = "Current Score: " + curScore;

        if (curScore > 21) {
            const bust = document.getElementById("bust");
            const choices = document.getElementById("choices");
            choices.style.display = "none";
            bust.style.display = "flex";
        }
    }
    if (target === "dealer") {
        let numA = 0;
        dScore = 0;
        for (let i in dCards) {
            let firstChar = dCards[i].split("")[0];
            if (firstChar === "A") {
                numA++
                continue;
            }
            if (isFinite(firstChar)) {
                dScore += Number(firstChar);
                continue;
            }
            dScore += 10;
        }
        dScore += numA * 1;
        while (numA > 0 && dScore + 10 <= 21) {
            dScore += 10;
            numA--;
        }
        const scoreTitle = document.getElementById("dscore-title");
        scoreTitle.innerText = "Dealer Score: " + dScore;

        if (dScore > 21) {
        }
    }
}

function addCard(target) {
    if (target === "user") {
        const cards = document.getElementById("cards");
        const cardImg = document.createElement("img");

        let randIndex = Math.floor(Math.random() * cardsArray.length);
        cardImg.src = "assets/cards/" + cardsArray[randIndex];
        cardImg.classList.add("card");
        cards.appendChild(cardImg);

        curCards.push(cardsArray[randIndex]);
        updateScore("user");

        // remove card from array
        let removed = cardsArray.splice(randIndex, 1);
        discardedCards.push(removed);
    }
    else if (target === "dealer") {
        const dcardsElem = document.getElementById("dcards");
        const cardImg = document.createElement("img");

        let randIndex = Math.floor(Math.random() * cardsArray.length);
        cardImg.src = "assets/cards/" + cardsArray[randIndex];
        cardImg.classList.add("card");
        dcardsElem.appendChild(cardImg);

        dCards.push(cardsArray[randIndex]);
        updateScore("dealer");

        // remove card from array
        let removed = cardsArray.splice(randIndex, 1);
    }
}

function resetGame() {
    curScore = 0;

    while (dCards.length > 0) {
        cardsArray.push(dCards.pop());
    }

    while (curCards.length > 0) {
        cardsArray.push(curCards.pop());
    }

    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    const dcardsElem = document.getElementById("dcards");
    dcardsElem.innerHTML = "";

    const bust = document.getElementById("bust");
    const choices = document.getElementById("choices");
    const main = document.getElementById("main");
    const startScreen = document.getElementById("start-screen");
    const dealer = document.getElementById("dealer");

    startScreen.style.display = "none";
    main.style.display = "inline";
    choices.style.display = "flex";
    bust.style.display = "none";
    dealer.style.display = "inline";

    addCard("user");
    addCard("user");
    addCard("dealer");
}

function dealerTurn() {
    const choices = document.getElementById("choices");
    const dealer = document.getElementById("dealer");

    choices.style.display = "none";

}

resetGame();
// dealerTurn();
document.getElementById("play-btn").addEventListener("mousedown", resetGame);
document.getElementById("replay-btn").addEventListener("mousedown", resetGame);
document.getElementById("stay-btn").addEventListener("mousedown", dealerTurn);
