import { toElement } from 'based/client';

const renderErrorDialogHTML = (error: string) => `
  <dialog class="c-card u-fc u-gap">
    <h2>Oops, something went wrong</h2>
    <div>${error}</div>
  </dialog>
`;

export const openErrorDialog = (error: string) =>
{
  const dialog = toElement<HTMLDialogElement>(renderErrorDialogHTML(error));
  document.body.appendChild(dialog);

  dialog.onclose = () => dialog.remove();
  dialog.showModal();
};

export default renderErrorDialogHTML;
