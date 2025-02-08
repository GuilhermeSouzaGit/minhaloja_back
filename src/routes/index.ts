import { Router, Request, Response } from "express";
import { userRoutes } from "./User.routes";

class RouterManager {
	private routes = Router();

	constructor() {
		this.indexRoutes();
		this.addHealthCheck();
	}

	private indexRoutes() {
		this.routes.use("/users", userRoutes);
	}

	private addHealthCheck() {
		this.routes.get("/", (req: Request, res: Response) => {
			res.status(200).json({
				status: "running",
				timestamp: new Date().toISOString(),
			});
		});
	}

	public getRoutes() {
		return this.routes;
	}
}

export default RouterManager;
