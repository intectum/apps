export class BasisDialog extends HTMLDialogElement
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
    close.className = 'c-button c-circle u-invert'; // TODO review 'u-invert' or even adding this close button here...
    close.style.position = 'absolute';
    close.style.right = 'var(--spacer)';
    close.style.top = 'var(--spacer)';
    close.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 384 512">
        <!--! Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. -->
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="currentColor" />
      </svg>
    `;
    close.onclick = () => this.close();

    this.appendChild(close);
  }
}

export const defineBasisDialog = () =>
  customElements.define('basis-dialog', BasisDialog, { extends: 'dialog' });
