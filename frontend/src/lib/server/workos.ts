import { WorkOS } from '@workos-inc/node';
import { env } from '$env/dynamic/private';

if (!env.WORKOS_API_KEY) {
    console.error("WORKOS_API_KEY is not set in environment variables.");
}

export const workos = new WorkOS(env.WORKOS_API_KEY || "placeholder_key_to_prevent_crash_on_build");

export const clientId = env.WORKOS_CLIENT_ID;
