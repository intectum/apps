class TrustyPawsContactForm extends HTMLFormElement
{
  connectedCallback()
  {
    this.onsubmit = event =>
    {
      event.preventDefault();

      const actionContainer = this.querySelector<HTMLElement>('[data-section="actions"]');
      if (!actionContainer) return;

      const nameInput = this.querySelector<HTMLInputElement>('[name="name"]');
      const emailInput = this.querySelector<HTMLInputElement>('[name="email"]');
      const startDateInput = this.querySelector<HTMLInputElement>('[name="startDate"]');
      const endDateInput = this.querySelector<HTMLInputElement>('[name="endDate"]');
      const messageInput = this.querySelector<HTMLTextAreaElement>('[name="message"]');

      const messageHtml = messageInput?.value
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

      fetch('http://localhost:5001/trusty-paws-prod/us-central1/sendEmail', {
        method: 'POST',
        body: JSON.stringify({
          subject: `New message from ${nameInput?.value}`,
          html: `
          <p>From: ${nameInput?.value} (${emailInput?.value})</p>
          <p>Dates: ${startDateInput?.value} - ${endDateInput?.value}</p>
          <blockquote>${messageHtml}</blockquote>
        `
        })
      })
        .then(response => response.ok ? onSuccess() : onFailure())
        .catch(onFailure);
    };
  }
}

customElements.define('trusty-paws-contact-form', TrustyPawsContactForm, { extends: 'form' });
