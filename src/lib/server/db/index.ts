import { dev } from '$app/environment'
import { drizzle } from 'drizzle-orm/d1'
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { env } from '$env/dynamic/private'
import Database from 'better-sqlite3'

export const db = () => {
	if (dev) {
		return drizzleSqlite(new Database('./local.db'), { schema, casing: 'snake_case' })
	}

	return drizzle(env.DB, { schema, casing: 'snake_case' })
}
