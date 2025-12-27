
class MemoryGame {
  constructor(options = {}) {
    this.board = document.getElementById(options.boardId || 'board');
    this.cards = Array.from(document.querySelectorAll('.card'));
    this.flippedCards = [];
    this.matchedCards = [];
    this.images = options.images || []; // optional array of CSS `url("...")` strings

    this._boundFlip = this.flipCard.bind(this);
    this.attachListeners();
  }

  attachListeners() {
    this.cards.forEach(card => {
      card.removeEventListener('click', this._boundFlip);
      card.addEventListener('click', this._boundFlip);
    });
  }

  flipCard(event) {
    const card = event.currentTarget || this;
    if (card.classList.contains('matched') || card.classList.contains('flipped')) return;
    if (this.flippedCards.length >= 2) return;

    card.classList.add('flipped');
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) this.checkMatch();
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    const img1 = card1.querySelector('.card-back')?.style.backgroundImage;
    const img2 = card2.querySelector('.card-back')?.style.backgroundImage;

    if (img1 === img2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.matchedCards.push(card1, card2);
      this.flippedCards = [];

      if (this.matchedCards.length === this.cards.length) {
        setTimeout(() => alert('Congratulations! You win!'), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        this.flippedCards = [];
      }, 1000);
    }
  }

  shuffleImages(images = null) {
    const source = images && images.length ? images : this.images;

    let imgs = [];
    if (source && source.length >= this.cards.length) {
      imgs = source.slice(0, this.cards.length);
    } else {
      imgs = this.cards.map(card => card.querySelector('.card-back')?.style.backgroundImage || '').filter(Boolean);
      if (imgs.length > 0 && imgs.length < this.cards.length) {
        const needed = this.cards.length - imgs.length;
        for (let i = 0; i < needed; i++) imgs.push(imgs[i % imgs.length]);
      }
    }

    if (imgs.length < this.cards.length) return; // nothing to assign

    const shuffled = imgs.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.cards.forEach((card, idx) => {
      const back = card.querySelector('.card-back');
      if (back) back.style.backgroundImage = shuffled[idx] || '';
    });
  }

  startGame() {
    this.matchedCards = [];
    this.flippedCards = [];
    this.cards.forEach(card => {
      card.classList.remove('flipped', 'matched');
      card.style.pointerEvents = 'auto';
    });
    
    this.shuffleImages();
    this.attachListeners();
  }

  resetGame() {
    this.matchedCards = [];
    this.flippedCards = [];
    this.cards.forEach(card => {
      card.classList.remove('flipped', 'matched');
      card.style.pointerEvents = 'auto';
    });
  
    
    this.attachListeners();
  }
}


const memoryGame = new MemoryGame();
window.memoryGame = memoryGame;
window.startGame = () => memoryGame.startGame();
window.resetGame = () => memoryGame.resetGame();

