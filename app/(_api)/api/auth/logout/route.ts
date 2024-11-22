import { NextResponse } from "next/server";

export async function GET() {
	try {
		// In a stateless JWT approach, logout is typically handled client-side
		// by removing the token. Here we'll just return a success message.
		return NextResponse.json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
	}
}