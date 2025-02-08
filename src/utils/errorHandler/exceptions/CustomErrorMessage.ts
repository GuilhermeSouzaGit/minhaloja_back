export class CustomErrorMessage extends Error {
	public statusCode: number;

	constructor(statusCode: number = 400, message: string) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}
