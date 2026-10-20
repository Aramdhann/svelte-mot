import type { Handle } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { building } from '$app/env';
import { auth } from '#lib/server/auth.ts';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const PUBLIC_PATHS = new Set(['/login', '/register']);

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	} else if (
		!building &&
		!PUBLIC_PATHS.has(event.url.pathname) &&
		!event.url.pathname.startsWith('/api/auth')
	) {
		redirect(302, '/login');
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
