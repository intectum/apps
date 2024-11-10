'use client';

import { FC, useState } from 'react';
import { renderToString } from 'react-dom/server';

import { Button } from 'apps-web';

import { sendEmail } from '../app/server-actions';
import { ContactForm as ContactFormType } from '../graphql/types';

type Props =
{
  contactForm: ContactFormType;
};

const ContactForm: FC<Props> = ({ contactForm }) =>
{
  const [ result, setResult ] = useState<boolean>();

  const submit = async (formData: FormData) =>
  {
    try
    {
      setResult(await sendEmail(
        'contact-form@trustypawslondon.co.uk',
        'hello@trustypawslondon.co.uk',
        `New message from ${formData.get('name')}`,
        renderToString(
          <>
            <p>From: {formData.get('name') as string} ({formData.get('email') as string})</p>
            <p>Dates: {formData.get('startDate') as string} - {formData.get('endDate') as string}</p>
            <blockquote>
              {(formData.get('message') as string)
                .split('\n')
                .filter(paragraph => !!paragraph)
                .map(paragraph => <p>{paragraph}</p>)}
            </blockquote>
          </>
        )
      ));
    }
    catch (err)
    {
      console.error(err);
      setResult(false);
    }
  };

  return (
    <form className="u-py--xl" action={submit}>
      <div className="u-container u-fc u-gap">
        <h2 id="contact-form" className="u-text-center">{contactForm.title}</h2>
        <label>Name</label>
        <input name="name" required/>
        <label>Email</label>
        <input name="email" type="email" required/>
        <div className="u-fr u-gap">
          <div className="u-fc u-gap u-f1">
            <label>Start date</label>
            <input name="startDate" type="date" required/>
          </div>
          <div className="u-fc u-gap u-f1">
            <label>End date</label>
            <input name="endDate" type="date" required/>
          </div>
        </div>
        <label>Message</label>
        <textarea name="message" rows={10} required/>
        <div className="u-fr u-gap u-center">
          {result === false && <div>Sorry, something went wrong... Try again?</div>}
          {!result && <Button type="submit" invert>Send</Button>}
          {result && <div>Message sent!</div>}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
