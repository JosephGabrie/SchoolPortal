import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  // Allow access to login and auth routes, and static assets if any (usually handled before hooks for static files but good to be safe)
  if (!session && !event.url.pathname.startsWith('/login') && !event.url.pathname.startsWith('/auth')) {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
