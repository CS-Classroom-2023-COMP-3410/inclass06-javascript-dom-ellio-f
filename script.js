// function to get a random index to choose the cards from
const randIndex = function(lastIndex) {
    return Math.floor(Math.random() * (lastIndex + 1));
}

// create all card based variables
let allCards = ["&#127136;", "&#127137;", "&#127138;", "&#127139;", "&#127140;", "&#127141;", "&#127142;", "&#127143;", "&#127144;",
  "&#127145;", "&#127146;", "&#127147;", "&#127148;", "&#127149;", "&#127150;", "&#127153;", "&#127154;", "&#127155;",
  "&#127156;", "&#127157;", "&#127158;", "&#127159;", "&#127160;", "&#127161;", "&#127162;", "&#127163;", "&#127164;",
  "&#127165;", "&#127166;", "&#127167;", "&#127169;", "&#127170;", "&#127171;", "&#127172;", "&#127173;", "&#127174;",
  "&#127175;", "&#127176;", "&#127177;", "&#127178;", "&#127179;", "&#127180;", "&#127181;", "&#127182;", "&#127183;",
  "&#127185;", "&#127186;", "&#127187;", "&#127188;", "&#127189;", "&#127190;", "&#127191;", "&#127192;", "&#127193;",
  "&#127194;", "&#127195;", "&#127196;", "&#127197;", "&#127198;", "&#127199;"];

let cardBack = allCards[0];
allCards.shift();

// random algo to shuffle of internet
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// create game deck
let gameDeck = [];
for (let i=0; i< 8; i++) {
    let lastIndex = allCards.length - 1;
    r = randIndex(lastIndex);
    gameDeck.push(allCards[r]);
    allCards.splice(r, 1);
}
gameDeck = gameDeck.concat(gameDeck);

// Shuffle the deck before displaying
shuffle(gameDeck);

// handle clicks and add clicked card to current pair
currentPair = [];
win_count = 0;
const handleClick = function(event) {
    console.log(event.target.id);
    let cardIdx = event.target.id.slice(5);
    event.target.innerHTML = gameDeck[cardIdx];
    currentPair.push(event.target.id);

    // check for match
    if (currentPair.length === 2) {
        // If same card clicked twice, just reset
        if (currentPair[0] === currentPair[1]) {
            currentPair = [];
            return;
        }
        // If not a match, flip back after delay
        let idx1 = currentPair[0].slice(5);
        let idx2 = currentPair[1].slice(5);
        if (gameDeck[idx1] !== gameDeck[idx2]) {
            setTimeout(function() {
                document.querySelector('#' + currentPair[0]).innerHTML = cardBack;
                document.querySelector('#' + currentPair[1]).innerHTML = cardBack;
                currentPair = [];
            }, 1000);
        } else {
            // If match, just clear pair
            currentPair = [];
            win_count += 1;
            // Check for win
            if (win_count === 8) {
                setTimeout(function() {
                    alert("You win!");
                }, 500);
            }
        }
    }
}

// attaches handleClick function to each card in the HTML
for(let i = 0; i < 16; i++) {
    document.querySelector('#card-'+i).onclick = handleClick;
    // to disable -> set onClick = null;
}

    

// console.log(gameDeck);
console.log(currentPair);