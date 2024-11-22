import { PrismaClient, RoleType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const admin = {
	email: "admin@froneiture.com",
	password: "Admin1234!",
	name: "Admin",
	phoneNumber: "+6266666666",
}

async function seedAdminRoles() {
	// Create roles if they don't exist
	const roles = Object.values(RoleType).map(async (roleName) => {
		return prisma.role.upsert({
			where: { name: roleName },
			update: {},
			create: { name: roleName }
		});
	});

	await Promise.all(roles);
}

async function createSuperAdmin() {

	const { email, password, name, phoneNumber } = admin

	const superAdminRole = await prisma.role.findUnique({
		where: { name: 'SUPER_ADMIN' }
	});

	if (!superAdminRole) {
		throw new Error('SUPER_ADMIN role not found');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const account = await prisma.account.create({
		data: {
			email,
			password: hashedPassword,
			roles: {
				create: {
					roleId: superAdminRole.id
				}
			},
			user: {
				create: {
					name,
					phoneNumber
				}
			}
		}
	});

	return account;
}

async function main() {
	await seedAdminRoles();
	await createSuperAdmin();
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