class ContactRow extends HTMLDivElement
{
  connectedCallback()
  {
    const removeContact = this.querySelector('[data-action="remove-contact"]') as HTMLButtonElement;
    removeContact.addEventListener('click', () => this.remove());
  }
}

export const defineRegisterContactRow = () =>
  customElements.define('hm-register-contact-row', ContactRow, { extends: 'div' });
