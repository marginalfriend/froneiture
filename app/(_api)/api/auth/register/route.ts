import prisma from "@/prisma/client/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/constants/env";

async function getDefaultCustomerRole() {
	let role = await prisma.role.findUnique({
		where: { name: 'CUSTOMER' }
	});

	if (!role) {
		role = await prisma.role.create({
			data: { name: 'CUSTOMER' }
		});
	}

	return role;
}

export async function POST(req: NextRequest) {
	try {
		const { email, password, name, phoneNumber } = await req.json();

		// Validate input
		if (!email || !password || !name) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Check if user already exists
		const existingAccount = await prisma.account.findUnique({ where: { email } });
		if (existingAccount) {
			return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Get default customer role
		const customerRole = await getDefaultCustomerRole();

		// Create account with associated user and role
		const account = await prisma.account.create({
			data: {
				email,
				password: hashedPassword,
				user: {
					create: {
						name,
						phoneNumber
					}
				},
				roles: {
					create: {
						roleId: customerRole.id
					}
				}
			},
			include: {
				user: true,
				roles: {
					include: {
						role: true
					}
				}
			}
		});

		const token = jwt.sign(
			{
				id: account.id,
				email: account.email,
				roles: account.roles.map(ar => ar.role.name)
			},
			JWT_SECRET!,
			{ expiresIn: '1h' }
		);

		return NextResponse.json({
			message: 'Registration successful',
			token,
			user: {
				id: account.user?.id,
				name: account.user?.name,
				email: account.email,
				roles: account.roles.map(ar => ar.role.name)
			}
		}, { status: 201 });

	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
	}
}
