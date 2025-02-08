import { User } from "../../domain/entities/user.entity";
import { CreateUserDTO } from "../../dtos/user/create";
import { UserRepository } from "../../infra/repositories/user.repository";
import { CustomErrorMessage } from "../../utils/errorHandler/exceptions/CustomErrorMessage";

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
