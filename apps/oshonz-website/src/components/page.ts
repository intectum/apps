import renderOSHOPageHTML from '../templates/page';

class OSHOPage extends HTMLElement
{
  connectedCallback()
  {
    this.innerHTML = renderOSHOPageHTML();
  }
}

customElements.define('osho-page', OSHOPage);
