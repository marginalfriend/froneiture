// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function middleware(req: NextRequest) {
	// Check if the path starts with /admin
	if (req.nextUrl.pathname.startsWith('/admin')) {
		// Get the auth token from cookies
		const token = req.cookies.get('auth_token')?.value;

		// If no token, redirect to login
		if (!token) {
			return NextResponse.redirect(new URL('/login', req.url));
		}

		try {
			// Verify the token
			verify(token, JWT_SECRET);
			return NextResponse.next();
		} catch (error) {
			console.log(error)
			// Invalid token, redirect to login
			return NextResponse.redirect(new URL('/login', req.url));
		}
	}

	return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
	matcher: '/admin/:path*'
};