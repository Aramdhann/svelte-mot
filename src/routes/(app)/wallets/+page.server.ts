import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { db } from '#lib/server/db/index.ts';
import { wallet } from '#lib/server/db/schema.ts';

const TYPES = ['cash', 'bank', 'ewallet', 'other'] as const;
type WalletType = (typeof TYPES)[number];

export const load: PageServerLoad = async ({ locals }) => {
	const wallets = await db
		.select()
		.from(wallet)
		.where(eq(wallet.userId, locals.user!.id))
		.orderBy(desc(wallet.createdAt));
	return { wallets };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.', values: undefined });

		const data = await request.formData();
		const name = (data.get('name') ?? '').toString().trim();
		const type = (data.get('type') ?? 'cash').toString();

		if (!name) return fail(400, { message: 'Name is required.', values: { name, type } });
		if (name.length > 100)
			return fail(400, { message: 'Name must be at most 100 characters.', values: { name, type } });
		if (!TYPES.includes(type as WalletType))
			return fail(400, { message: 'Invalid wallet type.', values: { name, type } });

		await db.insert(wallet).values({ userId: locals.user.id, name, type });
		return { success: true, values: undefined };
	}
};
