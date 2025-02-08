import { v7 as uuid } from "uuid";
import { CustomErrorMessage } from "../../utils/errorHandler/exceptions/CustomErrorMessage";

export class User {
	private constructor(
		public readonly userId: string,
		public name: string,
		public readonly email: string,
		public password: string,
		public isStorekeeper: boolean = false,
		public status: string,
		public phone?: string | null,
		public orders?: [],
		public usedCoupons?: [],
		public managedStores?: [],
		public street?: string | null,
		public zipCode?: string | null,
		public city?: string | null,
		public state?: string | null,
		public houseNumber?: string | null,
		public addressComplement?: string | null,
		public district?: string | null,
		public cpf?: string | null,
		public dateOfBirth?: Date | null,
	) {}

	private static isEmailValid(email: string): void {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email))
			throw new CustomErrorMessage(400, "Formato do email inválido");
	}

	public static create(name: string, email: string, password: string): User {
		this.isEmailValid(email);
		return new User(uuid(), name, email, password, false, "active");
	}
}
