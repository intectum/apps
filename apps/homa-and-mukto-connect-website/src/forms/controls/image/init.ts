import { init } from 'apps-web/client';

init['[data-init="image-control"]'] = async element =>
{
  const imageInput = element.querySelector('[name="image"]') as HTMLInputElement;
  const imageOpen = element.querySelector('[data-name="image-open"]') as HTMLButtonElement;
  const image = element.querySelector('[data-name="image"]') as HTMLImageElement;

  imageInput.addEventListener('change', async event =>
  {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const base64 = btoa(String.fromCharCode(...(await file.bytes())));
    image.src = `data:${file.type};base64,${base64}`;
    image.style.display = 'block';
    imageOpen.children[1]?.remove();
  });

  imageOpen.addEventListener('click', () => imageInput.click());
};
