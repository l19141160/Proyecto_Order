import { AsyncDatabase } from 'promised-sqlite3';

class _db {
	async init() {
		this.db = await AsyncDatabase.open("UserManager.db");
		await this.db.run(
			"CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)",
			(err) => {
				if (err) {
					console.error(err.message);
				}
			}
		);

		await this.db.run(
			"CREATE TABLE IF NOT EXISTS access_tokens (username TEXT, token TEXT)",
			(err) => {
				if (err) {
					console.error(err.message);
				}
			}
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