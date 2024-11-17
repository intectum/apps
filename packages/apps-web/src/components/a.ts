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
        this.onclick = event =>
        {
          event.preventDefault();
          history.pushState({}, '', newValue);
          window.dispatchEvent(new CustomEvent('pushstate'));
        };
      }
    }
  }
}

customElements.define('basis-a', BasisAnchor, { extends: 'a' });

export default BasisAnchor;
