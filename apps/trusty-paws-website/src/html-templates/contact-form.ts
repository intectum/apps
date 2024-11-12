import { ContactForm } from '../graphql/types';

const createContactFormElement = (contactForm: ContactForm) =>
{
  const html = `
    <form class="u-py--xl">
      <div class="u-container u-fc u-gap">
        <h2 id="contact-form" class="u-text-center">${contactForm.title}</h2>
        <label>Name</label>
        <input name="name" required></input>
        <label>Email</label>
        <input name="email" type="email" required></input>
        <div class="u-fr u-gap">
          <div class="u-fc u-gap u-f1">
            <label>Start date</label>
            <input name="startDate" type="date" required></input>
          </div>
          <div class="u-fc u-gap u-f1">
            <label>End date</label>
            <input name="endDate" type="date" required></input>
          </div>
        </div>
        <label>Message</label>
        <textarea name="message" rows={10} required></textarea>
        <div data-action-container="" class="u-fr u-gap u-center">
          <button class="c-button u-rounded u-theme--main-inverted">Send</button>
        </div>
      </div>
    </form>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;

  const nameInput = container.querySelector('[name="name"]') as HTMLInputElement;
  const emailInput = container.querySelector('[name="email"]') as HTMLInputElement;
  const startDateInput = container.querySelector('[name="startDate"]') as HTMLInputElement;
  const endDateInput = container.querySelector('[name="endDate"]') as HTMLInputElement;
  const messageInput = container.querySelector('[name="message"]') as HTMLTextAreaElement;
  const actionContainer = container.querySelector('[data-action-container]') as HTMLElement;

  const form = container.querySelector('form') as HTMLFormElement;
  form.onsubmit = event =>
  {
    event.preventDefault();

    const messageHtml = messageInput.value
      .split('\n')
      .filter(paragraph => !!paragraph)
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('');

    const onSuccess = () => actionContainer.innerHTML = 'Message sent!';
    const onFailure = () =>
    {
      if (!actionContainer.innerHTML.includes('Sorry'))
      {
        actionContainer.prepend('Sorry, something went wrong... Try again?');
      }
    };

    fetch('http://localhost:5001/trusty-paws/us-central1/sendEmail', {
      method: 'POST',
      body: JSON.stringify({
        subject: `New message from ${nameInput.value}`,
        html: `
          <p>From: ${nameInput.value} (${emailInput.value})</p>
          <p>Dates: ${startDateInput.value} - ${endDateInput.value}</p>
          <blockquote>${messageHtml}</blockquote>
        `
      })
    })
      .then(response => response.ok ? onSuccess() : onFailure())
      .catch(onFailure);
  };

  return container.firstElementChild as HTMLDivElement;
};

export default createContactFormElement;
