import { LitElement, html, css } from 'lit';
import { MemoryCard } from './memory-card.js';

class MemoryGame extends LitElement {
  static styles = css`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box; /* tells the browser to account for margin & padding in the values for width and height */
    }

    body {
      height: 100vh;
      display: flex;
      background: darkgoldenrod;
    }

    .memory-game {
      width: 640px;
      height: 640px;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      border: 2px solid rebeccapurple;
      perspective: 1000px;
    }
  `;

  static properties = {
    _hasFlippedCard: { state: true },
    _lockBoard: { state: true },
    _firstCard: { state: true },
    _secondCard: { state: true },
  };
  constructor() {
    super();
    this._hasFlippedCard = false;
    this._lockBoard = false;
    this._firstCard = {};
    this._secondCard = {};
  }

  // Reset the board after every 2 cards clicked
  _resetBoard() {
    [this._hasFlippedCard, this._lockBoard] = [false, false]; // Destructuring assignment used here
    [this._firstCard, this._secondCard] = [null, null];
  }

  _disableCards() {
    // it's a match!
    this._firstCard.removeEventListener('click', this._firstCard._cardClicked);
    this._secondCard.removeEventListener('click', this._secondCard._cardClicked);
    // this._resetBoard();
  }

  _unflipCards() {
    this._lockBoard = true;
    //not a match
    setTimeout(() => {
      this._firstCard.shadow.classList.remove('flip');
      this._secondCard.shadow.classList.remove('flip');
      this._lockBoard = false;
    }, 1200);
  }

  _checkForMatch() {
    // do cards match?
    let isMatch = this._firstCard.dataset.framework === this._secondCard.dataset.framework;
    isMatch ? this._disableCards() : this._unflipCards();
  }

  _flipCard(e) {
    if (this._lockBoard) return;
    if (e.detail.triggerEl === this._firstCard) return;

    e.detail.triggerEl.shadow.classList.toggle('flip');

    if (!this._hasFlippedCard) {
      // first card that player clicked
      this._hasFlippedCard = true;
      this._firstCard = e.detail.triggerEl; /* `this` is the card that fired the event */
      return;
    }
    // second card that player clicked
    this._hasFlippedCard = false;
    this._secondCard = e.detail.triggerEl;

    this._checkForMatch();
  }

  render() {
    return html`<section class="memory-game" @cardClicked=${this._flipCard}>
      <memory-card
        front-img="img/angular.svg"
        back-img="img/js-badge.svg"
        data-framework="angular"
      ></memory-card>
      <memory-card
        front-img="img/angular.svg"
        back-img="img/js-badge.svg"
        data-framework="angular"
      ></memory-card>
      <memory-card
        front-img="img/aurelia.svg"
        back-img="img/js-badge.svg"
        data-framework="aurelia"
      ></memory-card>
      <memory-card
        front-img="img/aurelia.svg"
        back-img="img/js-badge.svg"
        data-framework="aurelia"
      ></memory-card>
      <memory-card
        front-img="img/backbone.svg"
        back-img="img/js-badge.svg"
        data-framework="backbone"
      ></memory-card>
      <memory-card
        front-img="img/backbone.svg"
        back-img="img/js-badge.svg"
        data-framework="backbone"
      ></memory-card>
      <memory-card
        front-img="img/ember.svg"
        back-img="img/js-badge.svg"
        data-framework="ember"
      ></memory-card>
      <memory-card
        front-img="img/ember.svg"
        back-img="img/js-badge.svg"
        data-framework="ember"
      ></memory-card>
      <memory-card
        front-img="img/react.svg"
        back-img="img/js-badge.svg"
        data-framework="react"
      ></memory-card>
      <memory-card
        front-img="img/react.svg"
        back-img="img/js-badge.svg"
        data-framework="react"
      ></memory-card>
      <memory-card
        front-img="img/vue.svg"
        back-img="img/js-badge.svg"
        data-framework="vue"
      ></memory-card>
      <memory-card
        front-img="img/vue.svg"
        back-img="img/js-badge.svg"
        data-framework="vue"
      ></memory-card>
    </section>`;
  }
}
customElements.define('memory-game', MemoryGame);
