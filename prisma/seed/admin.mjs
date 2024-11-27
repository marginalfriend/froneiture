import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const admin = {
	email: "admin@froneiture.com",
	password: "Admin1234!",
}

async function createSuperAdmin() {

	const { email, password } = admin

	const hashedPassword = await bcrypt.hash(password, 10);

	const account = await prisma.account.create({
		data: {
			email,
			password: hashedPassword,
		}
	});

	return account;
}

async function main() {
	console.log("Creating admin account for FroNeiture")

	await createSuperAdmin();

	console.log("Admin account created")
	console.log("Email:", admin.email)
	console.log("Password:", admin.password)
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

export default main;