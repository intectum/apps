class BasisAnchor extends HTMLAnchorElement
{
  static observedAttributes = [ 'href' ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributeChangedCallback(name: string, oldValue: any, newValue: any)
  {
    if (name === 'href')
    {
      const external = typeof newValue === 'string' ? !!newValue.match(/^[a-z]+:/)?.length : false;
      if (external)
      {
        this.setAttribute('target', '_blank');
        this.setAttribute('referrerPolicy', 'no-referrer');
      }
      else
      {
        this.removeAttribute('target');
        this.removeAttribute('referrerPolicy');
      }
    }
  }
}

customElements.define('basis-a', BasisAnchor, { extends: 'a' });
