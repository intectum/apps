class TrustyPawsContactForm extends HTMLFormElement
{
  connectedCallback()
  {
    this.onsubmit = event =>
    {
      event.preventDefault();

      const nameInput = this.querySelector('[name="name"]') as HTMLInputElement;
      const emailInput = this.querySelector('[name="email"]') as HTMLInputElement;
      const startDateInput = this.querySelector('[name="startDate"]') as HTMLInputElement;
      const endDateInput = this.querySelector('[name="endDate"]') as HTMLInputElement;
      const messageInput = this.querySelector('[name="message"]') as HTMLTextAreaElement;
      const actionContainer = this.querySelector('[data-action-container]') as HTMLElement;

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

      fetch('http://localhost:5001/trusty-paws-prod/us-central1/sendEmail', {
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
  }
}

customElements.define('trusty-paws-contact-form', TrustyPawsContactForm, { extends: 'form' });
