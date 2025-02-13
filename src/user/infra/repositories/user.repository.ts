import { prisma } from "../../../db/prisma";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user.interface";

export class UserRepository implements IUserRepository {
	async save(user: User): Promise<User> {
		return await prisma.user.create({
			data: {
				userId: user.userId,
				name: user.name,
				email: user.email,
				phone: user.phone,
				password: user.password,
				isStorekeeper: user.isStorekeeper,
				status: "active",
			},
		});
	}
	async findByEmail(email: string): Promise<User[]> {
		const user = await prisma.user.findMany({ where: { email } });
		return user;
	}
}
