import { Database } from "./infra/db/connectDB";
import { Server } from "./server";

async function initializeServer() {
	const port = process.env.PORT || "8080";
	const server = new Server(port);

	const dbConnection = Database.getInstance();

	await server.start(dbConnection);
}

initializeServer();
