// Lấy tất cả card và container board (nếu có)
const cards = document.querySelectorAll('.card');
const board = document.getElementById('board'); // nếu bạn có wrapper với id="board"
let flippedCards = [];
let matchedCards = [];

// gắn sự kiện click cho từng card
cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  // nếu card đã được ghép hoặc đang lật thì không xử lý
  if (this.classList.contains('matched') || this.classList.contains('flipped')) return;
  if (flippedCards.length >= 2) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector('.card-back').style.backgroundImage;
  const img2 = card2.querySelector('.card-back').style.backgroundImage;

  if (img1 === img2) {
    // đánh dấu là matched để không thể click lại
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      setTimeout(() => alert("Congratulations! You win!"), 500);
    }
  } else {
    // lật ngược sau 1s
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Hàm xáo bài đơn giản (di chuyển các node trong container #board)
function shuffleCards() {
  if (!board) return; // nếu không có container thì bỏ qua
  const nodes = Array.from(cards);
  // Fisher-Yates shuffle trên mảng nodes
  for (let i = nodes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
  }
  // append lại theo thứ tự đã xáo
  nodes.forEach(node => board.appendChild(node));
}
function shuffleImages() {
     const images = [
       
      ];
      const shuffledImages = [...images].sort(() => Math.random() - 0.5);
      cards.forEach((card, index) => {
        card.querySelector('.card-back').style.backgroundImage = shuffledImages[index];
      });
    }
// Start game: reset trạng thái và xáo bài
function startGame() {
  matchedCards = [];
  flippedCards = [];
  cards.forEach(card => {
    card.classList.remove('flipped', 'matched');
    card.style.pointerEvents = 'auto';
  });
  shuffleImages();
  attachListeners();
}

// Reset game: lật lại tất cả thẻ, xóa trạng thái, xáo bài
function resetGame() {
  matchedCards = [];
  flippedCards = [];
  cards.forEach(card => {
    card.classList.remove('flipped', 'matched');
    card.style.pointerEvents = 'auto';
  });
  attachListeners();
}
