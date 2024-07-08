const cardsArray = ['4H.svg', '3D.svg', '9S.svg', '2H.svg', '6S.svg', 'KC.svg', 'TC.svg', '5H.svg', '3S.svg', '7D.svg', 'JC.svg', 'JD.svg', 'AS.svg', 'TH.svg', '8C.svg', '6C.svg', '2D.svg', 'KD.svg', '4D.svg', 'KH.svg', '9H.svg', '3H.svg', '9C.svg', 'AD.svg', 'QC.svg', '7S.svg', '9D.svg', 'AH.svg', '8D.svg', 'JS.svg', '6D.svg', 'KS.svg', '5S.svg', 'TD.svg', '4C.svg', 'QS.svg', '2S.svg', '7C.svg', 'QD.svg', 'JH.svg', '8S.svg', 'AC.svg', '4S.svg', 'TS.svg', '5C.svg', '2C.svg', '5D.svg', '8H.svg', '3C.svg', 'QH.svg', '7H.svg', '6H.svg']
const curCards = [];

let curScore = 0;

const play_btn = document.getElementById("play-btn");
play_btn.addEventListener("mousedown", () => {
    const startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";
    const main = document.getElementById("main");
    main.style.display = "block";
    addCard();
    addCard();
})

const hit_btn = document.getElementById("hit-btn");
hit_btn.addEventListener("mousedown", () => {
    addCard();
})

function updateScore() {
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

function addCard() {
    const cards = document.getElementById("cards");
    const cardImg = document.createElement("img");

    let randIndex = Math.floor(Math.random() * cardsArray.length);
    cardImg.src = "assets/cards/" + cardsArray[randIndex];
    cardImg.classList.add("card");
    cards.appendChild(cardImg);

    curCards.push(cardsArray[randIndex]);
    updateScore();

    // remove card from array
    let removed = cardsArray.splice(randIndex, 1);
}

function resetGame() {
    curScore = 0;

    while (curCards.length > 0) {
        cardsArray.push(curCards.pop());
    }

    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    const bust = document.getElementById("bust");
    const choices = document.getElementById("choices");
    choices.style.display = "flex";
    bust.style.display = "none";

    addCard();
    addCard();
}

document.getElementById("replay-btn").addEventListener("mousedown", resetGame);

addCard();
addCard();
