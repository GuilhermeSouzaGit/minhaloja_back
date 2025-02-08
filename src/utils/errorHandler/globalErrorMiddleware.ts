/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { CustomErrorMessage } from "./exceptions/CustomErrorMessage";

export const globalErrorMiddleware = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof CustomErrorMessage) {
		res.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
		return;
	}

	console.error(error);
	res.status(500).json({
		status: "error",
		message: "Ocorreu um erro interno no servidor.",
	});
	return;
};
