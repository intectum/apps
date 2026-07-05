import { init, toElement } from 'based/client';

const maxFileSize = 25 * 1024 * 1024; // 25MB

init['[data-init="image-control"]'] = async element =>
{
  const imageInput = element.querySelector('[name="image"]') as HTMLInputElement;
  const imageOpen = element.querySelector('[data-name="image-open"]') as HTMLButtonElement;
  const image = element.querySelector('[data-name="image"]') as HTMLImageElement;

  let imageUrl: string | undefined;

  imageInput.addEventListener('change', event =>
  {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const error = element.querySelector('[data-name="error"]');
    error?.remove();

    if (file.size > maxFileSize)
    {
      element.appendChild(toElement('<div data-name="error" class="u-orange">File too large (max 25MB)</div>'));
      return;
    }

    if (imageUrl) URL.revokeObjectURL(imageUrl);
    imageUrl = URL.createObjectURL(file);

    image.src = imageUrl;
    image.style.display = 'block';
    while (imageOpen.children.length > 1) imageOpen.lastElementChild?.remove();
  });

  imageOpen.addEventListener('click', () => imageInput.click());
};
