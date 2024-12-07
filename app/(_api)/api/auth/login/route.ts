// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		// Find user by email
		const account = await prisma.account.findUnique({ where: { email } });
		if (!account) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Verify password
		const isPasswordValid = await bcrypt.compare(password, account.password);
		if (!isPasswordValid) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Create JWT token
		const token = sign({ userId: account.id }, JWT_SECRET, { expiresIn: '1h' });

		// Create response with secure httpOnly cookie
		const response = NextResponse.json({ message: 'Login successful' });
		response.cookies.set('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 3600, // 1 hour
			path: '/'
		});

		return response;
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
	}
}