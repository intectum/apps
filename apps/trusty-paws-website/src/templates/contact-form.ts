import { ContactForm } from '../graphql/types';

const renderContactFormHTML = (contactForm: ContactForm) => `
  <form is="trusty-paws-contact-form" class="u-py--xl">
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

export default renderContactFormHTML;
