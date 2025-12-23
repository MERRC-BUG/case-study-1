
const cards = document.querySelectorAll('.card');
let flippedcard = [];
let matchedcards = [];

function flipCard() {
      if (flippedcard.length >=2) return;
      this.classlist.add('flipped');
      flippedcard.push(this);

      if (flippedcard.length ===2) {
            checkmatch();
      }
}    
function checkmatch(){
      const [card1, card2] = flippedcard;
      const img1 = card1.querySelectorAll('.card-back').style.backsgroundImage;
      const img2 = card2.querySelectorAll('.card-back').style.backsgroundImage;
      if (img1 === img2) {
            matchedcards.push(card1,card2);
            flippedcard = [];
            if (matchedcards.length === cards.length) {
                  setTimeout(() => alert("congratulations! you win!"), 500);
            }
            else {
                  setTimeout(() => {
                        card1.classlist.remove('flipped');
                        card2.classlist.remove('flipped');
                        flippedcard = [];
                  }, 1000);
            }
      }
}
cards.forEach(card => card.addEventListener('click', flipCard));

function startGame() {
      matchedcards = [];
      
      cards.forEach(card => card.classlist.remove('flipped'));
      shuffleCards();
}
function resetGame() {
      matchedcards = [];
      flippedcard = [];
      cards.forEach(card => card.classlist.remove('flipped'));
      shuffleCards();
}

