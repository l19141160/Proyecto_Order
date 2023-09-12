import db from './db.js'

export default async function list() {
	const conn = (await db.getInstance()).db;
	return await conn.all("SELECT username FROM users");
}