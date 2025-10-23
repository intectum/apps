import { init } from 'apps-web/client';
import { toElement } from 'apps-web';

const maxFileSize = 5 * 1024 * 1024; // 5MB

init['[data-init="image-control"]'] = async element =>
{
  const imageInput = element.querySelector('[name="image"]') as HTMLInputElement;
  const imageOpen = element.querySelector('[data-name="image-open"]') as HTMLButtonElement;
  const image = element.querySelector('[data-name="image"]') as HTMLImageElement;

  imageInput.addEventListener('change', async event =>
  {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const error = element.querySelector('[data-name="error"]');
    error?.remove();

    if (file.size > maxFileSize)
    {
      element.appendChild(toElement('<div data-name="error" class="u-danger">File too large (max 5MB)</div>'));
    }

    const base64 = btoa(String.fromCharCode(...(await file.bytes())));
    image.src = `data:${file.type};base64,${base64}`;
    image.style.display = 'block';
    imageOpen.children[1]?.remove();
  });

  imageOpen.addEventListener('click', () => imageInput.click());
};
