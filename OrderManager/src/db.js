import { AsyncDatabase } from 'promised-sqlite3';

class _db {
	async init() {
		this.db = await AsyncDatabase.open("Orders.db");
		await this.db.run(
			"CREATE TABLE IF NOT EXISTS orders (id, date, status, created_by)",
			(err) => {
				if (err) {
					console.error(err.message);
				}
			}
		);
		await this.db.run(
			"CREATE TABLE IF NOT EXISTS order_items (id, order_id, product_id, quantity)",
			(err) => {
				if (err) {
					console.error(err.message);
				}
			}
		);

		await this.db.run(
			"CREATE TABLE IF NOT EXISTS products (id, name, price)",
			(err) => {
				if (err) {
					console.error(err.message);
				}
			}
		);

		// insert some products if none exist
		await this.db.run(
			"INSERT INTO products (id, name, price) SELECT 1, 'Product 1', 0.99 WHERE NOT EXISTS(SELECT 1 FROM products WHERE id = 1)"
		);
		await this.db.run(
			"INSERT INTO products (id, name, price) SELECT 2, 'Product 2', 1.99 WHERE NOT EXISTS(SELECT 1 FROM products WHERE id = 2)"
		);
		await this.db.run(
			"INSERT INTO products (id, name, price) SELECT 3, 'Product 3', 2.99 WHERE NOT EXISTS(SELECT 1 FROM products WHERE id = 3)"
		);
		await this.db.run(
			"INSERT INTO products (id, name, price) SELECT 4, 'Product 4', 3.99 WHERE NOT EXISTS(SELECT 1 FROM products WHERE id = 4)"
		);
		await this.db.run(
			"INSERT INTO products (id, name, price) SELECT 5, 'Product 5', 4.99 WHERE NOT EXISTS(SELECT 1 FROM products WHERE id = 5)"
		);
		
	}
}

class db {
	constructor() {
		throw new Error("Use db.getInstance() instead of new.");
	}

	static async getInstance() {
		if (!db.instance) {
			db.instance = new _db();
			await db.instance.init();
		}
		return db.instance;
	}
}

export default db;