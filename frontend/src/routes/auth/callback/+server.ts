import { redirect } from '@sveltejs/kit';
import { workos, clientId } from '$lib/server/workos';
import { ConvexHttpClient } from "convex/browser";
import { env } from '$env/dynamic/private';

export const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    throw redirect(302, '/login');
  }

  try {
    const { user } = await workos.userManagement.authenticateWithCode({
      code,
      clientId,
    });

    const convexUrl = env.VITE_CONVEX_URL || env.PUBLIC_CONVEX_URL;

    // Ensure Convex URL is available
    if (!convexUrl) {
        console.error("VITE_CONVEX_URL or PUBLIC_CONVEX_URL is missing");
        throw new Error("Configuration error");
    }

    const client = new ConvexHttpClient(convexUrl);

    // Sync user to Convex
    // We use the string path "users:sync" because the type-safe api object 
    // is not generated until the user runs `npx convex dev`.
    const userId = await client.mutation("users:sync", {
      workosId: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      profileImage: user.profilePictureUrl ?? undefined,
    });

    // Set session cookie
    cookies.set('session', userId, { path: '/' });

  } catch (error) {
    console.error("Auth error:", error);
    // In a real app, redirect to an error page
    throw redirect(302, '/login?error=auth_failed');
  }

  throw redirect(302, '/dashboard'); // Redirect to dashboard
};
