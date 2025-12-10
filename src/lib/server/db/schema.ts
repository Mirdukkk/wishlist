import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(unixepoch())`)
})

export const reservations = sqliteTable('reservations', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	itemId: text('item_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(unixepoch())`)
})

export type User = typeof users.$inferSelect
export type Reservation = typeof reservations.$inferSelect
