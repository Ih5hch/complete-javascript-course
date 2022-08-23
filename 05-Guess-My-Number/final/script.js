// document.querySelector('.message').textContent = 'Guess..🤔';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 13;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.ceil(Math.random() * 20);
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);
  if (!guess || guess > 20 || guess < 0) {
    // document.querySelector('.message').textContent = '🛑 No/Wrong number...';
    displayMessage('🛑 No/Wrong number...');
  } else if (guess === secretNumber) {
    displayMessage('🏆 Correct Number !');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? ' 📈 Too High !' : '📈 Too Low !';
      displayMessage(guess > secretNumber ? ' 📈 Too High !' : '📈 Too Low !');
      score -= 1;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage(' You lose');
      document.querySelector('.score').textContent = 0;
    }
  }

  // if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = ' 📈 Too High !';
  //     score -= 1;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = ' You lose';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }

  // if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too Low !';
  //     score -= 1;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = ' You lose';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', () => {
  secretNumber = Math.ceil(Math.random() * 20);
  score = 20;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
