import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(303, '/');
	}
	return {
		email: event.url.searchParams.get('email'),
		token: event.url.searchParams.get('token'),
		error: event.url.searchParams.get('error')
	};
};
