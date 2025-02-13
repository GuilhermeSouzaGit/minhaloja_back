import { CustomErrorMessage } from "../../../utils/errorHandler/exceptions/CustomErrorMessage";
import { CreateUserDTO } from "../../domain/dtos/user/create";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../infra/repositories/user.repository";

export class CreateUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(input: Omit<CreateUserDTO, "userId">): Promise<CreateUserDTO> {
		const { name, email, password } = input;

		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser.length > 0) {
			throw new CustomErrorMessage(400, "Esse email já está em uso");
		}

		const newUser = User.create(name, email, password);

		await this.userRepository.save(newUser);

		return newUser;
	}
}
