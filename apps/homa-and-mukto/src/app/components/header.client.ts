import { toElement } from 'apps-web';
import { applyInit, init, navigate } from 'apps-web/client';

import { FullUser } from '../../types';
import { getToken } from '../util/data';
import { renderProfileDialogHTML, renderReviewProfileDialogHTML } from './header.template';
import { initProfileForm } from './profile-form.client';

init['[data-init="header-profile"]'] = element =>
{
  element.addEventListener('click', () =>
  {
    const token = getToken();
    if (!token) return;

    const dialog = toElement<HTMLDialogElement>(renderProfileDialogHTML(token.user));
    document.body.appendChild(dialog);

    dialog.onclose = () => dialog.remove();
    dialog.showModal();
  });
};

init['[data-init="header-admin"]'] = element =>
{
  const token = getToken();
  if (!token) return;

  if (token.user.admin) element.style.display = '';
};

init['[data-init="header-logout"]'] = element =>
{
  element.addEventListener('click', async () =>
  {
    localStorage.removeItem('token');
    await navigate('/login');
  });
};

init['[data-init="profile-form-header"]'] = async element =>
{
  await initProfileForm(element as HTMLFormElement, getToken()?.user, async response =>
  {
    const token = getToken();
    if (token)
    {
      token.user = await response.json() as FullUser;
      localStorage.setItem('token', JSON.stringify(token));
    }

    applyInit(document.body, [ '[data-init="user-image"]' ]);

    if (token?.user.pending)
    {
      const dialog = toElement<HTMLDialogElement>(renderReviewProfileDialogHTML());
      document.body.appendChild(dialog);

      dialog.onclose = () => dialog.remove();
      dialog.showModal();
    }
  });
};
