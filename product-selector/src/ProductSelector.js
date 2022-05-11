import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ProductSelector-styles.js';
import { GftFinancialOverviewV0 } from '../demo/mocks/BGADP.js';
import './DataManager';
import { DataManager } from './DataManager';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-web-template-modal/bbva-web-template-modal.js';

/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<product-selector></product-selector>
```

##styling-doc

@customElement product-selector
*/
export class ProductSelector extends LitElement {
  static get is() {
    return 'product-selector';
  }

  // Declare properties
  static get properties() {
    return {
      name: { type: String },
      active: { type: Boolean },
      items: { type: Array },
      selected: { type: Number },
      type: { type: String },
      _iterador: { type: Number, state: true },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.name = 'BBVA';
    this.items = [];
    this.type = 'card'; //acount
    this.active = false;
    this.selected = 0;
    this._iterador = 0;
  }

  static get styles() {
    return [styles, getComponentSharedStyles('product-selector-shared-styles')];
  }

  // Define a template
  //<data-manager @apiData="${this._handlerApiData}" url="https://mock-senda-node.herokuapp.com/financial-overview/v0/financial-overview?contracts.productType=ACCOUNTS" metodo="GET"></data-manager>
  render() {
    return html`
      <!--<bbva-button-default variant="primary">Default</bbva-button-default>
      <bbva-web-template-modal heading="Modal title" description="Subtitle" button="Button Active" link="Type Link" > <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae metus tincidunt, cursus nulla et, venenatis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ornare blandit elit vel porttitor. Phasellus ultricies eleifend quam quis rhoncus.</p> <p>Fusce massa tellus, aliquam ut neque ut, ultricies sodales augue. Vivamus vitae nunc urna. Nullam et cursus ligula. Suspendisse mattis felis non molestie dictum. Donec vehicula eget turpis sed laoreet. Cras eleifend, justo eu varius tincidunt, urna dui imperdiet enim, sed posuere massa dolor vitae odio. Etiam congue aliquet magna, ac scelerisque lorem varius quis.</p> </bbva-web-template-modal>-->
      
      <slot></slot>
      <p>Welcome to ${this.name}</p>

      ${this.items.map(
        (listCurrency) =>
          html`
            <h4>${listCurrency.currency}</h4>
            ${listCurrency.products.map(
              (lista) =>
                html`
                  <section class="flex-section">
                    <div class="flex" style="width:15%">
                      <input
                        type="radio"
                        id="${lista.printedNumber}"
                        name="productos"
                        value="${lista.printedNumber}"
                        .checked="${this._handlerIterador(
                          lista.printedNumber,
                          lista.balance
                        )}"
                        @click="${
                          this._handlerClick(
                            lista.printedNumber,
                            lista.balance
                          )}"
                      />
                      ${this.type === 'card'
                        ? html`<img src="../demo/icono.png" />`
                        : html`<img src="" />`}
                    </div>
                    <div style="width:85%">
                      <div class="flex">
                        <p class="${this.active ? `text-black` : ``}">
                          ${lista.printedNumber}
                        </p>
                        <p class="${this.active ? `text-black` : ``}">
                          ${lista.balance} ${listCurrency.currency}
                        </p>
                      </div>
                      <div class="flex">
                        <p>${lista.alias}</p>
                        <p>Saldo disponible</p>
                      </div>
                    </div>
                  </section>
                `
            )}
          `
      )}
    `;
  }

  _handlerClick(numeroCta, balance) {
    var incremento = 0;
    console.log('entrando')
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < this.items[i].products.length; j++) {
        if (this.items[i].products[j].printedNumber == numeroCta) {
          this.selected = incremento;
          this._iterador = 0;
        }
        incremento++;
      }
    }

    var resultado = {
      numeroCta,
      balance,
    };

    this.dispatchEvent(
      new CustomEvent('item-selected', {
        composed: true,
        bubbles: true,
        detail: resultado,
      })
    );
  }

  _handlerIterador(numeroCta, balance) {
    if (this.selected === this._iterador) {
      this._iterador += 1;
      this.active = true;
      return true;
    } else if (this._iterador < this.selected) {
      this._iterador += 1;
      this.active = false;
      return false;
    } else {
      this.active = false;
      return false;
    }
  }

  clearCurrentSelection() {
    this.selected = -1;
    this._iterador = 0;
  }
}
