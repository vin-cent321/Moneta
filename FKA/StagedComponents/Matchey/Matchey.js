// code from https://github.com/WebDevSimplified/Mix-Or-Match
// based on HTML/CSS https://youtu.be/28VfzEiJgy4
// Javascript https://www.youtube.com/watch?v=3uuQ3g92oPQ

import React from "react";
import '../styles/Matchey.css';


function match() {
    class AudioController {
        constructor() {
            this.bgMusic = new Audio('[BREAK]Assets/Audio/creepy.mp3'); //broken on purpose
            this.flipSound = new Audio('Assets/Audio/flip.wav');
            this.matchSound = new Audio('Assets/Audio/match.wav');
            this.victorySound = new Audio('Assets/Audio/victory.wav');
            this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
            this.bgMusic.volume = 0.5;
            this.bgMusic.loop = true;
        }
        startMusic() {
            this.bgMusic.play();
        }
        stopMusic() {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
        flip() {
            this.flipSound.play();
        }
        match() {
            this.matchSound.play();
        }
        victory() {
            this.stopMusic();
            this.victorySound.play();
        }
        gameOver() {
            this.stopMusic();
            this.gameOverSound.play();
        }
    }

    class MixOrMatch {
        constructor(totalTime, cards) {
            this.cardsArray = cards;
            this.totalTime = totalTime;
            this.timeRemaining = totalTime;
            this.timer = document.getElementById('time-remaining')
            this.ticker = document.getElementById('flips');
            this.audioController = new AudioController();
        }

        startGame() {
            this.totalClicks = 0;
            this.timeRemaining = this.totalTime;
            this.cardToCheck = null;
            this.matchedCards = [];
            this.busy = true;
            setTimeout(() => {
                this.audioController.startMusic();
                this.shuffleCards(this.cardsArray);
                this.countdown = this.startCountdown();
                this.busy = false;
            }, 500)
            this.hideCards();
            this.timer.innerText = this.timeRemaining;
            this.ticker.innerText = this.totalClicks;
        }
        startCountdown() {
            return setInterval(() => {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
                if(this.timeRemaining === 0)
                    this.gameOver();
            }, 1000);
        }
        gameOver() {
            clearInterval(this.countdown);
            this.audioController.gameOver();
            document.getElementById('game-over-text').classList.add('visible');
        }
        victory() {
            clearInterval(this.countdown);
            this.audioController.victory();
            document.getElementById('victory-text').classList.add('visible');
        }
        hideCards() {
            this.cardsArray.forEach(card => {
                card.classList.remove('visible');
                card.classList.remove('matched');
            });
        }
        flipCard(card) {
            if(this.canFlipCard(card)) {
                this.audioController.flip();
                this.totalClicks++;
                this.ticker.innerText = this.totalClicks;
                card.classList.add('visible');

                if(this.cardToCheck) {
                    this.checkForCardMatch(card);
                } else {
                    this.cardToCheck = card;
                }
            }
        }
        checkForCardMatch(card) {
            if(this.getCardType(card) === this.getCardType(this.cardToCheck))
                this.cardMatch(card, this.cardToCheck);
            else 
                this.cardMismatch(card, this.cardToCheck);

            this.cardToCheck = null;
        }
        cardMatch(card1, card2) {
            this.matchedCards.push(card1);
            this.matchedCards.push(card2);
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.audioController.match();
            if(this.matchedCards.length === this.cardsArray.length)
                this.victory();
        }
        cardMismatch(card1, card2) {
            this.busy = true;
            setTimeout(() => {
                card1.classList.remove('visible');
                card2.classList.remove('visible');
                this.busy = false;
            }, 1000);
        }
        shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
            for (let i = cardsArray.length - 1; i > 0; i--) {
                let randIndex = Math.floor(Math.random() * (i + 1));
                cardsArray[randIndex].style.order = i;
                cardsArray[i].style.order = randIndex;
            }
        }
        getCardType(card) {
            return card.getElementsByClassName('card-value')[0].src;
        }
        canFlipCard(card) {
            return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    function ready() {
        let overlays = Array.from(document.getElementsByClassName('overlay-text'));
        let cards = Array.from(document.getElementsByClassName('card'));
        let game = new MixOrMatch(100, cards);

        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible');
                game.startGame();
            });
        });

        cards.forEach(card => {
            card.addEventListener('click', () => {
                game.flipCard(card);
            });
        });
    }
}

function Matchey() {
    match()
    return (
        <div className='MatchElement'>
  <h1 className="page-title">Mix-Or-Match</h1>
  <div className="overlay-text visible">
    Click to Start
  </div>
  <div id="game-over-text" className="overlay-text">
    GAME OVER
    <span className="overlay-text-small">Click to Restart</span>
  </div>
  <div id="victory-text" className="overlay-text">
    VICTORY
    <span className="overlay-text-small">Click to Restart</span>
  </div>

  <div className="game-container">
    <div className="game-info-container">
      <div className="game-info">
        Time <span id="time-remaining">100</span>
      </div>
      <div className="game-info">
        Flips <span id="flips">0</span>
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Bat.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Bat.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Bones.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Bones.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Cauldron.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Cauldron.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Eye.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Eye.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Skull.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Skull.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Pumpkin.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Pumpkin.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Ghost.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Ghost.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Dracula.png" />
      </div>
    </div>
    <div className="card">
      <div className="card-back card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png" />
        <img alt=' ' className="spider" src="Assets/Images/Spider.png" />
      </div>
      <div className="card-front card-face">
        <img alt=' ' className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png" />
        <img alt=' ' className="card-value" src="Assets/Images/Dracula.png" />
      </div>
    </div>
  </div>
    </div>
    )
}
export default Matchey;