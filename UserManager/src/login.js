import db from './db.js'

export default async function login(username, password) {
	const conn = (await db.getInstance()).db;
	let user = await conn.all("SELECT username FROM users WHERE username = ? AND password = ?", [username, password]);
	
	if (user.length == 0) {
		throw new Error("Invalid username or password");
	}

	const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	await conn.run("INSERT INTO access_tokens (username, token) VALUES (?, ?)", [username, token]);
	return token
}