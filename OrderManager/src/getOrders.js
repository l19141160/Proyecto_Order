import db from './db.js'

export default async function getOrders(username) {
	const conn = (await db.getInstance()).db;

	let orders = await conn.all("SELECT id, date, status FROM orders WHERE created_by = ?", [username]);
	return orders;
}