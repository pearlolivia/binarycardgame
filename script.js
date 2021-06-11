const cards = document.querySelectorAll('.binary-card');
const images = document.getElementsByTagName('img');
let level1 = true;
let level1complete = false;
let level2 = false;
let level2complete = false;
let level3 = false;
let level3complete = false;
let freestyle = false;

function flipCard() {
    this.classList.toggle('flip');
    console.log(document.getElementsByClassName('binary-card 16'));
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
    let flippedCards = document.querySelectorAll('.flip');

    if(flippedCards[0].dataset.framework === '2' && flippedCards[1].dataset.framework === '1') {
        //correct cards picked to complete level 1 (add to 3)
        level1 = false;
        level1complete = true;
        level2 = true;
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flip'));
        }, 800);
        Array.prototype.forEach.call(images,img => img.style.background = "red");
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
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flip'));
        }, 800);
        Array.prototype.forEach.call(images,img => img.style.background = "yellow");
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
        freestyle = true;
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flip'));
        }, 800);
        Array.prototype.forEach.call(images,img => img.style.background = "green");
    }
}

function checkLevel() {
    if(!level1 && level2 && level1complete) {
        document.getElementById("instructions").innerHTML = "2) Flip the cards to make a total of 6";
    } else if(!level1 && !level2 && level3 && level1complete && level2complete) {
        document.getElementById("instructions").innerHTML = "3) Flip the cards to make a total of 7";
    } else if (!level1 && !level2 && !level3 && level1complete && level2complete && level3complete && freestyle) {
        document.getElementById("instructions").innerHTML = "Freestyle! Play around with your counting";
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', checkLevel));