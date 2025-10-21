class GroupRow extends HTMLDivElement
{
  connectedCallback()
  {
    const removeGroup = this.querySelector('[data-action="remove-group"]') as HTMLButtonElement;
    removeGroup.addEventListener('click', () => this.remove());
  }
}

export const defineRegisterGroupRow = () =>
  customElements.define('hm-register-group-row', GroupRow, { extends: 'div' });
