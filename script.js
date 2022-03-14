'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currrent0El = document.querySelector('#current--0');
const currrent1El = document.querySelector('#current--1');
const player0Bg = document.querySelector('.player--0');
const player1Bg = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

// Starting Conditions
const init = function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player0Bg.classList.remove('player--winner');
    player1Bg.classList.remove('player--winner');
    player0Bg.classList.add('player--active');
    player1Bg.classList.remove('player--active');
    currrent0El.textContent = 0;
    currrent1El.textContent = 0;
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Bg.classList.toggle('player--active');
    player1Bg.classList.toggle('player--active');
};

// Clicking 'Roll Dice' button
btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6 + 1);

        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to the active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {}
        // Switch to the next player
        switchPlayer();
    }
});

// Clicking "New Game" button
btnNew.addEventListener('click', init);