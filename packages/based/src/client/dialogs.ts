import renderXmarkSvg from '../common/icons/xmark';
import { toElement } from './elements';
import { init } from './init';

export const addDialogs = () =>
{
  init['dialog'] = element =>
  {
    const dialog = element as HTMLDialogElement;

    dialog.onclick = event =>
    {
      if (event.target === dialog) dialog.close();
    };

    const close = toElement(`
      <button title="Close" class="c-button c-circle" style="position: absolute; right: var(--spacer); top: var(--spacer);">
        ${renderXmarkSvg(24)}
      </button>
    `);
    close.onclick = () => dialog.close();
    dialog.insertBefore(close, dialog.firstChild);

    dialog.appendChild(close);
  };
};
