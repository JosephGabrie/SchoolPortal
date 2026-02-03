import { redirect } from '@sveltejs/kit';
import { workos, clientId } from '$lib/server/workos';

export const actions = {
  default: async ({ url }) => {
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      clientId,
      redirectUri: `${url.origin}/auth/callback`,
    });

    throw redirect(302, authorizationUrl);
  }
};
