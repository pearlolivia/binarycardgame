const cards = document.querySelectorAll('.binary-card');
const images = document.querySelectorAll('.card');
const stars = document.querySelectorAll('.star');
stars.forEach(star => star.style.display = 'none');

let level1 = true;
let level1complete = false;
let level2 = false;
let level2complete = false;
let level3 = false;
let level3complete = false;
let level4 = false;
let level4complete = false;
let level5 = false;
let level5complete = false;
let level6 = false;
let level6complete = false;
let freestyle = false;

function nextLevel(cards, level, colour) {
    if(window.confirm("Congrats you've completed level " + level + "! Click OK to go to the next level")) {
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('flip'));
        }, 800);
        //change colour of cards to signify new level
        Array.prototype.forEach.call(images, img => img.style.background = colour);
        document.getElementsByClassName('star ' + level + 'star')[0].style.display = 'block';
    }
}

function flipCard() {
    //flip clicked card
    this.classList.toggle('flip');

    //flip binary code card below with corresponding spot card
    switch (this.dataset.framework) {
        case '16':
            document.getElementsByClassName('binary-card 16')[0].classList.toggle('flip');
            break
        case '8':
            document.getElementsByClassName('binary-card 8')[0].classList.toggle('flip');
            break
        case '4':
            document.getElementsByClassName('binary-card 4')[0].classList.toggle('flip');
            break
        case '2':
            document.getElementsByClassName('binary-card 2')[0].classList.toggle('flip');
            break
        case '1':
            document.getElementsByClassName('binary-card 1')[0].classList.toggle('flip');
            break
        default:
            return
    }

    //check value of flipped cards and progress to next level if conditions met
    let flippedCards = document.querySelectorAll('.flip');
    if(flippedCards[0].dataset.framework === '2' && flippedCards[1].dataset.framework === '1' && level1) {
        //correct cards picked to complete level 1 (add to 3)
        //current level no longer 1 , level 1 now complete and level 2 started
        level1 = false;
        level1complete = true;
        level2 = true;
        //return all cards to unflipped state and change card colour
        nextLevel(flippedCards,'1','#FF5456');
        //document.getElementsByClassName('star 1star')[0].style.display = 'block';
    } else if(flippedCards[0].dataset.framework === '4'
        && flippedCards[1].dataset.framework === '2'
        && level1complete
        && !level2complete
        && flippedCards.length === 4) {
        //correct cards picked to complete level 2 (add to 6)
        level1 = false;
        level2 = false;
        level2complete = true;
        level3 = true;
        nextLevel(flippedCards,'2','#FFBF64');
    } else if(flippedCards[0].dataset.framework === '4'
        && flippedCards[1].dataset.framework === '2'
        && flippedCards[2].dataset.framework === '1'
        && flippedCards.length === 6
        && level2complete
        && !level3complete) {
        //correct cards picked to complete level 3 (add to 7)
        level1 = false;
        level3 = false;
        level3complete = true;
        level4 = true;
        nextLevel(flippedCards,'3','#FFFD80');
    } else if(flippedCards[0].dataset.framework === '8'
    && flippedCards[1].dataset.framework === '2'
    && flippedCards[2].dataset.framework === '1'
    && flippedCards.length === 6
    && level3complete
    && !level4complete) {
        //correct cards picked to complete level 4 (add to 11)
        level4 = false;
        level4complete = true;
        level5 = true;
        nextLevel(flippedCards,'4','#b4f0a7');
    } else if (flippedCards[0].dataset.framework === '16'
    && flippedCards.length === 2
    && level4complete
    && !level5complete) {
        //correct cards picked to complete level 5 (add to 16)
        level5 = false;
        level5complete = true;
        level6 = true;
        nextLevel(flippedCards,'5','#cc99ff');
    } else if (flippedCards[0].dataset.framework === '16'
    && flippedCards[1].dataset.framework === '4'
    && flippedCards.length === 4
    && level5complete
    && !freestyle) {
        //correct cards picked to complete level 6 (add to 20)
        level6 = false;
        level6complete = true;
        freestyle = true;
        nextLevel(flippedCards,'6','#1AF029');
    }
}

function checkLevel() {
    if(!level1 && level2 && level1complete) {
        document.getElementById("instructions").innerHTML = "2) Add up to <span style=\"font-size: 60px\">6</span>";
    } else if(!level1 && !level2 && level3 && level1complete && level2complete) {
        document.getElementById("instructions").innerHTML = "3) Add up to <span style=\"font-size: 60px\">7</span>";
    } else if (!level1 && !level2 && !level3 && level4 && level1complete && level2complete && level3complete && !level4complete) {
        document.getElementById("instructions").innerHTML = "4) Add up to <span style=\"font-size: 60px\">11</span>";
    } else if (!level1 && !level2 && !level3 && !level4 && level5 && level1complete && level2complete && level3complete && level4complete && !level5complete) {
        document.getElementById("instructions").innerHTML = "5) Add up to <span style=\"font-size: 60px\">16</span>";
    } else if (!level1 && !level2 && !level3 && !level4 && !level5 && level6 && level1complete && level2complete && level3complete && level4complete && level5complete && !level6complete) {
        document.getElementById("instructions").innerHTML = "6) Add up to <span style=\"font-size: 60px\">20</span>";
    } else if(!level1 && !level2 && !level3 && !level4 && !level5 && !level6 && freestyle && level1complete && level2complete && level3complete && level4complete && level5complete && level6complete) {
        document.getElementById("instructions").innerHTML = "Freestyle!";
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', checkLevel));

//deployment
//work in main branch, merge changes with deploy branch
//run gh-pages-deploy in deploy branch
