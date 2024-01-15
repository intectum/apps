export const invitationUrlPrefix = 'madfam.org/invitations/';

export const toInvitationId = (invitationUrl: string) => invitationUrl.substring(invitationUrlPrefix.length);

export const toInvitationUrl = (token: string) => `${invitationUrlPrefix}${token}`;
