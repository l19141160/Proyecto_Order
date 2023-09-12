import db from './db.js'

export default async function register(username, password) {
	const conn = (await db.getInstance()).db;
	return await conn.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
}