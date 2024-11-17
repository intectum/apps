class BasisDialog extends HTMLDialogElement
{
  constructor()
  {
    super();
  }

  connectedCallback()
  {
    this.onclick = event =>
    {
      if (event.target === this) this.close();
    };

    const close = document.createElement('button');
    close.title = 'Close';
    close.className = 'c-button c-circle u-invert';
    close.style.position = 'absolute';
    close.style.right = 'var(--spacer)';
    close.style.top = 'var(--spacer)';
    close.onclick = () => this.close();

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark u-icon';
    close.appendChild(icon);

    this.appendChild(close);
  }
}

customElements.define('basis-dialog', BasisDialog, { extends: 'dialog' });

export default BasisDialog;
