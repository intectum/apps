import { FC } from 'react';

import { Button } from 'apps-web';

import { ContactForm as ContactFormType } from '../graphql/types';

type Props =
{
  contactForm: ContactFormType;
};

const ContactForm: FC<Props> = ({ contactForm }) =>
  <div className="u-py--xl">
    <div className="o-container o-column">
      <h2 className="u-text-center">{contactForm.title}</h2>
      <label>Name</label>
      <input/>
      <label>Email</label>
      <input type="email"/>
      <div className="o-row">
        <div className="o-column u-f1">
          <label>Start date</label>
          <input type="date"/>
        </div>
        <div className="o-column u-f1">
          <label>End date</label>
          <input type="date"/>
        </div>
      </div>
      <label>Message</label>
      <textarea rows={10}/>
      <div className="u-fr u-justify--center">
        <Button invert className="c-button c-button--primary">Send</Button>
      </div>
    </div>
  </div>;

export default ContactForm;
