/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CreateUserUseCase } from "../use-cases/create-use-case";
import { UserRepository } from "../../infra/repositories/user.repository";
import { CreateUserDTO } from "../../domain/dtos/user/create";

export class UserController {
	private createUserUseCase: CreateUserUseCase;
	constructor() {
		const userRepository = new UserRepository();
		this.createUserUseCase = new CreateUserUseCase(userRepository);
	}

	createUser = async (req: Request, res: Response): Promise<any> => {
		const { name, email, password }: Omit<CreateUserDTO, "userId"> = req.body;

		const outputDTO = await this.createUserUseCase.execute({
			name,
			email,
			password,
		});

		return res.status(201).json(outputDTO);
	};
}
