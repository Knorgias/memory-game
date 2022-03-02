import { LitElement, html, css } from 'lit';

export class MemoryCard extends LitElement {
  static styles = css`
    :host {
      width: calc(25% - 10px); /* we want 4 cards per row so 25% each */
      height: calc(33.333% - 10px); /* we want 3 cards per column so 33.333% each */
    }
    .memory-card {
      width: 100%;
      height: 100%;
      position: relative;
      margin: 5px;
      transform: scale(1);
      transform-style: preserve-3d;
      transition: transform 0.5s;
    }

    .memory-card:active {
      transform: scale(0.97);
      transition: transform 0.2s;
    }

    .memory-card.flip {
      /*no space between classes because they belong to same element*/
      transform: rotateY(180deg);
    }

    .front-face,
    .back-face {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 5px;
      background: blueviolet;
      backface-visibility: hidden; /** hides the 'back' of the img */
    }

    .front-face {
      transform: rotateY(180deg);
    }
    img {
      width: 100px;
    }
  `;

  static properties = {
    dataFramework: { attribute: 'data-framework' },
    frontImg: { attribute: 'front-img' },
    backImg: { attribute: 'back-img' },
    freeze: { attribute: 'freeze' },
  };

  constructor() {
    super();
    this.shadow = '';
    this.dataFramework = '';
    this.freeze = false;
  }

  _shuffle() {
    let randomPos = Math.floor(Math.random() * 12);
    this.style.order = randomPos;
  }

  _cardClicked() {
    // dispatch an event for parent
    const options = {
      detail: { triggerEl: this },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('cardClicked', options));
  }

  firstUpdated() {
    // access a node in the Shadow DOM after initial render
    this._shuffle();
    this.addEventListener('click', this._cardClicked);
    console.log('Added event listener!');
    this.shadow = this.renderRoot.querySelector('.memory-card');
    console.log(this.shadow);

    let randomPos = Math.floor(Math.random() * 12); // get a random number 0-11;
    this.shadow.style.order = randomPos;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div class="memory-card">
        <img class="front-face" src=${this.frontImg} alt=${this.dataFramework} />
        <img class="back-face" src=${this.backImg} alt=${this.dataFramework} />
      </div>
    `;
  }
}
customElements.define('memory-card', MemoryCard);
