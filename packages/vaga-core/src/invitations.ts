import config from './config';

export const invitationUrlPrefix = `${config.hostName}/invitations/`;

export const toInvitationId = (invitationUrl: string) => invitationUrl.substring(invitationUrlPrefix.length);

export const toInvitationUrl = (token: string) => `${invitationUrlPrefix}${token}`;
