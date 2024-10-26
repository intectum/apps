'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (from: string, to: string, subject: string, body: string) =>
{
  const { error } = await resend.emails.send({
    from,
    to: [ to ],
    subject: subject,
    html: body
  });

  console.error('Failed to send email', error);

  return !error;
};
