import db from './db.js'

export default async function getOrders(username) {
	const conn = (await db.getInstance()).db;

	let orders = await conn.all("SELECT * FROM orders WHERE created_by = ?", [username]);

	for (let i = 0; i < orders.length; i++) {
		let items = await conn.all("SELECT * FROM order_items WHERE order_id = ?", [orders[i].id]);

		for (let j = 0; j < items.length; j++) {
			let item = await conn.get("SELECT * FROM products WHERE id = ?", [items[j].product_id]);
			items[j].item = item;
		}

		orders[i].items = items;
	}

	return orders;
}