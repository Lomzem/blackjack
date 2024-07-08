const cardsArray = ['4H.svg', '3D.svg', '9S.svg', '2H.svg', '6S.svg', 'KC.svg', 'TC.svg', '5H.svg', '3S.svg', '7D.svg', 'JC.svg', 'JD.svg', 'AS.svg', 'TH.svg', '8C.svg', '6C.svg', '2D.svg', 'KD.svg', '4D.svg', 'KH.svg', '9H.svg', '3H.svg', '9C.svg', 'AD.svg', 'QC.svg', '7S.svg', '9D.svg', 'AH.svg', '8D.svg', 'JS.svg', '6D.svg', 'KS.svg', '5S.svg', 'TD.svg', '4C.svg', 'QS.svg', '2S.svg', '7C.svg', 'QD.svg', 'JH.svg', '8S.svg', 'AC.svg', '4S.svg', 'TS.svg', '5C.svg', '2C.svg', '5D.svg', '8H.svg', '3C.svg', 'QH.svg', '7H.svg', '6H.svg']

const discardedCards = [];
const curCards = [];
const dCards = [];

let curScore = 0;
let dScore = 0;

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
            endGame("bust");
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
    let cardsElem;
    let hand;

    if (target === "user") {
        cardsElem = document.getElementById("cards");
        hand = curCards; // curCards is user's cards (in hand)
    }

    else if (target === "dealer") {
        cardsElem = document.getElementById("dcards");
        hand = dCards; // dCards is dealer's cards (in hand)
    }

    let randIndex = Math.floor(Math.random() * cardsArray.length);
    cardImg = document.createElement("img");
    cardImg.classList.add("card");
    cardImg.src = "assets/cards/" + cardsArray[randIndex];

    cardsElem.appendChild(cardImg);
    hand.push(cardsArray[randIndex]);
    updateScore(target);

    let removedCard = cardsArray.splice(randIndex, 1)[0];
    discardedCards.push(removedCard);
}

async function resetGame() {
    curScore = 0;
    dScore = 0;

    const scoreTitle = document.getElementById("score-title");
    scoreTitle.innerText = "Current Score Score: " + curScore;

    const dscoreTitle = document.getElementById("dscore-title");
    dscoreTitle.innerText = "Dealer Score: " + dScore;

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
    outcome.style.display = "none";
    dealer.style.display = "inline";

    await sleep(1500);
    addCard("user");

    await sleep(1500);
    addCard("user");

    await sleep(1500);
    addCard("dealer");

    choices.style.display = "flex";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerTurn() {
    const choices = document.getElementById("choices");
    const dealer = document.getElementById("dealer");

    choices.style.display = "none";

    // notEnough = (dScore < curScore && dScore < 21);
    // dontWantTie = (dScore === curScore && dScore <= 16);
    // while ((dScore < curScore && dScore < 21) || (dScore === curScore && dScore <= 16)) {
    while (dScore <= curScore && dScore < 21) {
        await sleep(1500);
        addCard("dealer");
    }
    if (curScore > dScore || dScore > 21) {
        console.log("Win");
        endGame("win");
    } else if (dScore > curScore && dScore <= 21) {
        console.log("Lost");
        endGame("lost");
    } else if (curScore === dScore) {
        endGame("tie");
    }

}

function endGame(reason) {
    const outcome = document.getElementById("outcome");
    const choices = document.getElementById("choices");
    choices.style.display = "none";
    outcome.style.display = "flex";

    const outcomeText = document.getElementById("outcome-text");
    outcomeText.innerHTML = "";

    if (reason === "bust") {
        t1 = document.createElement("h1");
        t1.innerHTML = "BUST!!";
        t2 = document.createElement("h1");
        t2.innerHTML = "You Lose!";
        outcomeText.appendChild(t1);
        outcomeText.appendChild(t2);
    }
    else if (reason === "lost") {
        t1 = document.createElement("h1");
        t1.innerHTML = "Dealer Wins!";
        outcomeText.appendChild(t1);
        t2 = document.createElement("h1");
        t2.innerHTML = "You Lose!";
        outcomeText.appendChild(t2);
    } else if (reason === "win") {
        t1 = document.createElement("h1");
        t1.innerHTML = "Congrats!";
        outcomeText.appendChild(t1);
        t2 = document.createElement("h1");
        t2.innerHTML = "You Win!";
        outcomeText.appendChild(t2);
    } else if (reason === "tie") {
        t1 = document.createElement("h1");
        t1.innerHTML = "It's a Tie!";
        outcomeText.appendChild(t1);
    }
}

// resetGame();
// dealerTurn();
document.getElementById("hit-btn").addEventListener("mousedown", () => { addCard("user"); });
document.getElementById("play-btn").addEventListener("mousedown", resetGame);
document.getElementById("replay-btn").addEventListener("mousedown", resetGame);
document.getElementById("stay-btn").addEventListener("mousedown", dealerTurn);
