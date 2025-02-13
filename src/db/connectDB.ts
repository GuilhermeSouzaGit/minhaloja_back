import { Pool } from "pg";

export class Database {
	private static instance: Database | null = null;

	private constructor() {}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public async connect(): Promise<void> {
		try {
			const pool = new Pool({
				connectionString: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false,
				},
			});

			await pool.connect();
			console.log("Database connected");
		} catch (error) {
			console.error("Error connecting to the database:", error);
			throw error;
		}
	}
}
