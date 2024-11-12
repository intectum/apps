import { initializeApp } from 'firebase-admin/app';
import { defineString } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { Resend } from 'resend';

const resendApiKey = defineString('RESEND_API_KEY');
initializeApp();

setGlobalOptions({ maxInstances: 10 });

type Data =
{
  subject: string;
  html: string;
};

export const sendEmail = onRequest({ cors: [ 'trustypawslondon.co.uk' ] }, async (req, res) =>
{
  try
  {
    const data = JSON.parse(req.body) as Data;
    console.log('data', data);

    const resend = new Resend(resendApiKey.value());

    const { error } = await resend.emails.send({
      from: 'contact-form@trustypawslondon.co.uk',
      to: [ 'hello@trustypawslondon.co.uk' ],
      subject: data.subject,
      html: data.html
    });

    if (error)
    {
      console.error('Failed to send email', error);
      res.status(500).send('Failed to send email');
    }
    else
    {
      res.status(200).end();
    }
  }
  catch (err)
  {
    console.error('Failed to send email', err);
    res.status(500).send('Failed to send email');
  }
});
