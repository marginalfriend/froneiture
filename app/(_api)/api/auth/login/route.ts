import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		// Validate input
		if (!email || !password) {
			return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
		}

		// Find account
		const account = await prisma.account.findUnique({
			where: { email },
			include: {
				user: true,
				roles: {
					include: {
						role: true
					}
				}
			}
		});

		if (!account) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Verify password
		const isPasswordValid = await bcrypt.compare(password, account.password);
		if (!isPasswordValid) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Generate JWT
		const token = jwt.sign(
			{
				id: account.id,
				email: account.email,
				roles: account.roles.map(ar => ar.role.name)
			},
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		return NextResponse.json({
			message: 'Login successful',
			token,
			user: {
				id: account.user?.id,
				name: account.user?.name,
				email: account.email,
				roles: account.roles.map(ar => ar.role.name)
			}
		});

	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json({ error: 'Login failed' }, { status: 500 });
	}
}