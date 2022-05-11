import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing'; // eslint-disable-line import/no-extraneous-dependencies
import '../product-selector.js';
import { ONE_CURRENCY, MORE_CURRENCY } from '../demo/mocks/demo.mocks.js';

suite('ProductSelector Emty items', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<product-selector></product-selector>`);
    await el.updateComplete;
  });

  test('when items is empty', () => {
    //console.log("el ", el.children)
    const items = el.children;
    assert.equal(items.length, 0);
  });
});

suite('ProductSelector ONE_CURRENCY', () => {
  let el;
  
  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`
    <product-selector .items="${ONE_CURRENCY}"></product-selector>
    <button>Limpiar</button>
    `);
    await el.updateComplete;
  });

  test('when currency is equal to MXN and when the product size is different from 0', () => {
    //console.log("el ", el.items)
    const element = el.shadowRoot.querySelector('h4');
    assert.notEqual(el.items.length , 0);
    assert.notEqual(el.items[0].products.length, 0);
    assert.equal(element.innerText, 'MXN');
  });

  test('when the image exist', async () => {
    el.type = "card";
    await el.updateComplete;
    const templateImg = el.shadowRoot.querySelector('img').getAttribute('src');
    assert.equal(el.type, "card");
    assert.equal(templateImg, '../demo/icono.png');
  });

  test('when the image does not exist', async () => {
    el.type = "count";
    await el.updateComplete;
    //console.log("x",el.shadowRoot.querySelector('img').getAttribute('src'));
    const templateImg = el.shadowRoot.querySelector('img').getAttribute('src');
    assert.notEqual(el.type, "card");
    assert.equal(templateImg, '');
    assert.isEmpty(templateImg);
  }); 

  test('when clicked to detect radio button selection', async () => {
    const radio = el.shadowRoot.querySelector('input');
    radio.dispatchEvent(new MouseEvent('click', () => {
      console.log("diste click");
    }));
  });

});

 /* suite('ProductSelector', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<product-selector></product-selector>`);
    await el.updateComplete;
  });

  test('instantiating the element with default properties works', () => {
    const element = el.shadowRoot.querySelector('p');
    assert.equal(element.innerText, 'Welcome to BBVA');
  });

});  */
