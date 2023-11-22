import db from './db.js'

export default async function createOrder(username, products) {
	const conn = (await db.getInstance()).db;

	let orderId = await conn.run("INSERT INTO orders (date, status, created_by) VALUES (?, ?, ?)", [Date.now(), "pending", username]);
	orderId = orderId.lastID;

	for (let i = 0; i < products.length; i++) {
		let product = await conn.all("SELECT id FROM products WHERE id = ?", [products[i]]);
		if (product.length == 0) {
			throw new Error("Invalid product");
		}

		await conn.run("INSERT INTO order_items (order_id, product_id) VALUES (?, ?)", [orderId, product[0].id]);
	}

	return orderId;
}