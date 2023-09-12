import db from './db.js'

export default async function authenticate(token) {
	const conn = (await db.getInstance()).db;
	let user = await conn.all("SELECT username FROM access_tokens WHERE token = ?", [token]);
	
	if (user.length == 0) {
		throw new Error("Invalid token");
	}

	return user[0].username;
}