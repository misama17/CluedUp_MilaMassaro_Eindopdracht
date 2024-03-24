// ----------------------- CONSTANTEN STARTSCHERM -----------------------
const startButton = document.querySelector("#start");
// ----------------------- CONSTANTEN DOBBELSTEEN -----------------------
const pElement = document.querySelector("#dobbelsteen");
const dobbelsteen = document.querySelector("#dobbelsteen_knop");
// ----------------------- CONSTANTEN KAARTJE -----------------------
const kaartje = document.querySelector("#kaartje_knop");
const kaartjeOverlay = document.querySelector("#kaartje");
const woordenlijst = document.querySelector("#woordenlijst");
const numberVeld = document.querySelector("#timer");
const ingevuldeWaarde = document.querySelector('input[name="correctWords"]:checked');
const opslaan = document.querySelector("#opslaan_knop");
// ----------------------- CONSTANTEN TEKST -----------------------
const beurtVeld = document.querySelector("#beurtveld");
const tekstVeld = document.querySelector("#tekstveld");
// ----------------------- VARIABELEN -----------------------
let achtergrondkleur = document.body;
let aantalOgen = 0;
let aantalWoorden = 0;
let totaalScore = 0;
let oudeScoreTeam1 = 0;
let oudeScoreTeam2 = 0;
let scoreTeam1 = 0;
let scoreTeam2 = 0;
let huidigeBeurt = "Team1";
let secondsPassed = 0;
let audioDobbelsteen = new Audio("rolling_dice.wav");
let audioWinningSound = new Audio("winning_sound.mp3");
let audioCountdownBeeper = new Audio("countdown_beeper.wav");

// -------------------------------------------------------------------------

// ----------------------- STARTSCHERM -----------------------
document.querySelector(".main_container").classList.add("away");
document.querySelector("#beurtveld").classList.add("away");

// Methode van "add.("away") heb ik van Erik geleerd.
function startGame() {
    document.querySelector(".name").classList.add("away");
    document.querySelector("#start").classList.add("away");
    document.querySelector(".background_image").classList.add("away");
    document.querySelector("#beurtveld").classList.remove("away");
    document.querySelector(".main_container").classList.remove("away");
}

startButton.addEventListener("click", startGame);

// Button #kaartje_knop en de optie om correcte aantal woorden in te vullen komt pas tevoorschijn als de dobbelsteen gegooid is.
document.querySelector("#kaartje_knop").classList.add("away");
document.querySelector(".correct_aantal_woorden").classList.add("away");

// ----------------------- DOBBELSTEEN GOOIEN -----------------------
// Ik heb inspiratie opgedaan van de huiswerkopdracht "dobbelsteen" en hem aangepast naar mijn spel.
// https://freesound.org/people/Aesterial-Arts/sounds/633852/
function gooiDobbelsteen(){
    document.querySelector(".correct_aantal_woorden").classList.add("away");
    aantalOgen = Math.floor(Math.random() * 3);
    audioDobbelsteen.play();
    pElement.textContent = "Je hebt " + aantalOgen + " gegooid.";
    let plaatjesArray = ['zero.png','one.png','two.png'];
    let dobbelsteenAfbeelding = plaatjesArray[aantalOgen];
    document.querySelector("img").src = 'images/' + dobbelsteenAfbeelding;
    document.querySelector("#dobbelsteen_knop").classList.add("away");
    document.querySelector("#kaartje_knop").classList.remove("away");
};

dobbelsteen.addEventListener('click', gooiDobbelsteen);

// ----------------------- KAARTJE PAKKEN -----------------------
// Inspiratie opgedaan van een voorbeeld laten zien in de klas.
function pakKaartje() {
    toonOverlayKaartje();
    let woorden = ["Prinses Beatrix","Nutella","Haribo","Assen","Puma",
        "UEFA","Starbucks","De Titanic","De Thalys","De Toren van Pisa","Kanaal",
        "Pretty Woman","Hogeschool van Amsterdam","Utrecht","PEC Zwolle","Hockey",
        "Fatbike","Politie","New Balance","WK voetbal","Olympische Winterspelen",
        "Het Concertgebouw","Mozart","Lionel Messi","Theater","Katy Perry","Beyoncé",
        "Apple Macbook","Peugeot","Max Verstappen","Texas","Samsung","Nike","Olifant",
        "Erasmus brug","BMW","Poesje miauw","Channing Tatum","AFC Ajax","Feyenoord","Europa",
        "Van der Valk","Bert en Ernie","Allerhande","Avatar: the way of water","Modern Family",
        "Tulp","Jennifer Aniston","Black Panther","Kylie Jenner","Kruidvat","Corendon","KLM","Cluedo",
        "PSV","Cristiano Ronaldo","Kim Kardashian","Albert Einstein","Justin Bieber","Jay-Z","Kanye West",
        "Mac Miller","Johan Cruijff","Edwin van der Sar","Manchester United", "Manchester City","Arsenal"
    ];

    // VAN CHATGPT. De vraag was: how do i randomize words with this code? Hierbij heb ik al een eerder gemaakte code ingevoerd.
    woorden = shuffleArray(woorden);
    while (woordenlijst.firstChild) {
        woordenlijst.removeChild(woordenlijst.firstChild);
    }
    // VAN CHATGPT. De vraag was: and then with 5 words? Ik heb het enige nodige stukje code eruit gefilterd. 
    const willekeurigeWoorden = woorden.slice(0,5);
    // Inspiratie opgedaan van een voorbeeld laten zien in de klas.
    willekeurigeWoorden.forEach(function(woord){
        const li = document.createElement("li");
        li.textContent = woord;
        woordenlijst.appendChild(li);
    });
    woorden = woordenlijst.querySelectorAll("li");
    woorden.forEach(function(woord){
        woord.style.marginBottom = "30px";
    });
    secondsPassed = 30;

    // Inspiratie opgedaan van een opdracht gemaakt in de klas.
    // https://freesound.org/people/makkuzu/sounds/653956/
    countSecondsDown();

    let timer = setInterval(countSecondsDown,1000);

    function countSecondsDown() {
        if (secondsPassed > 0) {
            document.querySelector("#timer").classList.remove("away");
            numberVeld.textContent = secondsPassed;
            secondsPassed--;
            document.querySelector("#kaartje_knop").classList.add("away");
        } else {
        clearInterval(timer);
        numberVeld.textContent = "Je beurt is voorbij!";
        while (woordenlijst.firstChild) {
            woordenlijst.removeChild(woordenlijst.firstChild);
        }
        document.querySelector(".correct_aantal_woorden").classList.remove("away");
        }
        if (secondsPassed === 2) {
            audioCountdownBeeper.play();
        }
    }
};

// VAN CHATGPT. De vraag was: how do i randomize words with this code? Hierbij heb ik al een eerder gemaakte code ingevoerd.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

kaartje.addEventListener('click', pakKaartje);

// ----------------------- SCORE: CORRECT AANTAL WOORDEN -----------------------
// VAN CHATGPT. De vraag was hoe ik een ingevulde waarde kon opslaan voor later gebruik. 
function scoreAantalWoorden() {
    let ingevuldeWaarde = document.querySelector('input[name="correctWords"]:checked');
    if (ingevuldeWaarde) {
        aantalWoorden = parseInt(ingevuldeWaarde.value);
    } 
    document.querySelector("#dobbelsteen_knop").classList.remove("away");
    document.querySelector(".correct_aantal_woorden").classList.add("away");
    document.querySelector("#timer").classList.add("away");
    verbergOverlayKaartje();
    updateTotaalScore();
};

opslaan.addEventListener('click', scoreAantalWoorden);

// ----------------------- SCORE: UPDATEN -----------------------
function updateTotaalScore() {
    totaalScore = aantalWoorden - aantalOgen;
    if (totaalScore <= 0) {
        totaalScore = 0;
    }
    if (huidigeBeurt === "Team1") {
        huidigeBeurt = "Team2";
        beurtVeld.textContent = "De beurt is aan: Team Geel!";
        veranderAchtergrondkleur("#FFB900");
        verhoogScore1();
    } else {
        huidigeBeurt = "Team1";
        beurtVeld.textContent = "De beurt is aan: Team Roze!";
        veranderAchtergrondkleur("#FF4095");
        verhoogScore2();
    }
};

function verhoogScore1() {
    oudeScoreTeam1 = scoreTeam1;
    scoreTeam1 += totaalScore;
    beweegPion1(scoreTeam1);
    updateHeading();
};

function verhoogScore2() {
    oudeScoreTeam2 = scoreTeam2;
    scoreTeam2 += totaalScore; 
    beweegPion2(scoreTeam2);
    updateHeading();
};

// ----------------------- PION OP SPEELVELD -----------------------
// Begin aan deze functie gemaakt met Lisette in de les.
function beweegPion1(vakje1) {
    let v1 = "#v" + vakje1; 
    let nieuwePositieTeam1 = document.querySelector(v1);
    let vak1 = "#v" + oudeScoreTeam1;
    if (scoreTeam1 <= 30) {
        nieuwePositieTeam1.classList.add("huidigePositie1"); 
    } else {
        updateHeading();
    }
    if(oudeScoreTeam1 > 0 && totaalScore !== 0) { 
        let oudePositieTeam1 = document.querySelector(vak1);
        oudePositieTeam1.classList.remove("huidigePositie1");
    } 
};

function beweegPion2(vakje2) {
    let v2 = "#v" + vakje2; 
    let nieuwePositieTeam2 = document.querySelector(v2);
    let vak2 = "#v" + oudeScoreTeam2;
    if (scoreTeam2 <= 30) {
        nieuwePositieTeam2.classList.add("huidigePositie2");
    } else {
        updateHeading();
    }
    if(oudeScoreTeam2 > 0 && totaalScore !== 0) {
        let oudePositieTeam2 = document.querySelector(vak2);
        oudePositieTeam2.classList.remove("huidigePositie2");
    }
};

// ----------------------- WANNEER HET SPEL KLAAR IS -----------------------
function updateHeading() {
    if (scoreTeam1 >= 31) {
        beurtVeld.textContent = "Team Roze heeft gewonnen!";
        document.querySelector(".main_container").classList.add("away");
        veranderAchtergrondkleur("#FF4095");
    } else if (scoreTeam2 >= 31) {
        beurtVeld.textContent = "Team Geel heeft gewonnen!";
        document.querySelector(".main_container").classList.add("away");
        veranderAchtergrondkleur("#FFB900");
    }
    winner();
};

// https://freesound.org/people/elijahdanie/sounds/487436/
function winner() {
    if (scoreTeam1 >= 31 || scoreTeam2 >= 31) {
        document.querySelector("#tekstveld").classList.remove("away");
        tekstVeld.textContent = "Gefeliciteerd!!";
        audioWinningSound.play();
    }
};

// ----------------------- ACHTERGRONDKLEUR VERANDEREN -----------------------
// VAN CHATGPT. De vraag was: achtergrond veranderen met javascript, zonder gebruik van een button.
function veranderAchtergrondkleur(kleur){
    achtergrondkleur.style.background = kleur;
};

// ----------------------- KAARTJE LAYOUT -----------------------
// VAN CHATGPT inspiratie opgedaan aan de hand van de functie "veranderAchtergrondkleur".
// Ander bron gebruikt voor inspo: https://www.scaler.com/topics/overlay-css/
function toonOverlayKaartje() {
    kaartjeOverlay.style.display = "block";
};

function verbergOverlayKaartje() {
    kaartjeOverlay.style.display = "none";
};