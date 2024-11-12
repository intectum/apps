class OSHOEventOpen extends HTMLButtonElement
{
  connectedCallback()
  {
    this.onclick = () =>
    {
      const eventDialog = this.parentElement?.querySelector('[data-event-dialog]') as HTMLDialogElement;
      eventDialog.showModal();
    };
  }
}

customElements.define('osho-event-open', OSHOEventOpen, { extends: 'button' });
