const cardsArray = ['4H.svg', '3D.svg', '9S.svg', '2H.svg', '6S.svg', 'KC.svg', 'TC.svg', '5H.svg', '3S.svg', '7D.svg', 'JC.svg', 'JD.svg', 'AS.svg', '1B.svg', 'TH.svg', '8C.svg', '6C.svg', '2D.svg', 'KD.svg', '4D.svg', 'KH.svg', '9H.svg', '3H.svg', '9C.svg', 'AD.svg', 'QC.svg', '7S.svg', '9D.svg', 'AH.svg', '8D.svg', 'JS.svg', '6D.svg', 'KS.svg', '5S.svg', 'TD.svg', '4C.svg', 'QS.svg', '2S.svg', '7C.svg', 'QD.svg', 'JH.svg', '8S.svg', 'AC.svg', '4S.svg', 'TS.svg', '5C.svg', '2C.svg', '2B.svg', '5D.svg', '8H.svg', '3C.svg', 'QH.svg', '7H.svg', '6H.svg']


const play_btn = document.getElementById("play-btn");
play_btn.addEventListener("mousedown", () => {
    const startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";
    const main = document.getElementById("main");
    main.style.display = "block";
    addCard();
    addCard();
})

function addCard() {
    const cards = document.getElementById("cards");
    const cardImg = document.createElement("img");

    let randIndex = Math.floor(Math.random() * cardsArray.length);
    cardImg.src = "assets/cards/" + cardsArray[randIndex];
    cardsArray.splice(randIndex, 1);

    cardImg.classList.add("card");
    cards.appendChild(cardImg);
}
