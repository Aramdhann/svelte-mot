import { mysqlTable, serial, int, text, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { user } from './auth.schema';

export const task = mysqlTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: int('priority').notNull().default(1)
});

export const wallet = mysqlTable('wallet', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 36 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 100 }).notNull(),
	type: varchar('type', { length: 20 }).notNull().default('cash'), // cash | bank | ewallet | other
	createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export * from './auth.schema';
