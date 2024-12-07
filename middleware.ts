// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');

export async function middleware(req: NextRequest) {
	// Skip authentication for /api/auth routes
	if (req.nextUrl.pathname.startsWith('/api/auth')) {
		return NextResponse.next();
	}

	// Allowed GET API
	if ((req.nextUrl.pathname.startsWith('/api/product') || req.nextUrl.pathname.startsWith('/api/unit')) && req.method === "GET") {
		return NextResponse.next()
	}

	// Secure /admin and /api routes
	if (req.nextUrl.pathname.startsWith('/admin') ||
		(req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/api/auth'))) {
		const token = req.cookies.get('auth_token')?.value;

		if (!token) {
			return NextResponse.redirect(new URL('/login', req.url));
		}

		try {
			await jwtVerify(token, JWT_SECRET);
			return NextResponse.next();
		} catch {
			return NextResponse.redirect(new URL('/login', req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*', '/api/:path*']
};