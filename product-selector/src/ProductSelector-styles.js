/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.flex {
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}

.flex p {
  margin-top: 0;
}

.flex-section {
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
}

.text-black {
  font-weight: 800;
}
`;