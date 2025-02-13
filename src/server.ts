import "express-async-errors";
import { config } from "dotenv";
import cors from "cors";
import express, { Express } from "express";
import RouterManager from "./routes";
import { globalErrorMiddleware } from "./utils/errorHandler/globalErrorMiddleware";
import { DatabaseConnection } from "./db/database.connection.interface";

export class Server {
	private app: Express;
	private port: string;

	constructor(port: string) {
		this.app = express();
		this.port = port;
		this.configureMiddleware();
	}

	private configureMiddleware(): void {
		config();
		this.app.use(cors({ credentials: true, origin: "*" }));
		this.app.use(express.json());
		this.app.use(express.static("public"));
		this.app.use("/api", new RouterManager().getRoutes());
		this.app.use(globalErrorMiddleware);
	}

	public async start(dbConnection: DatabaseConnection): Promise<void> {
		try {
			await dbConnection.connect();
			this.app.listen(this.port, () => {
				console.log(`Server started on port ${this.port}`);
			});
		} catch (error) {
			console.error("Error on initializing the server");
		}
	}
}
