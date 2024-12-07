import prisma from "@/prisma/client/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const data = await prisma.partnership.findMany()

		return NextResponse.json({
			data
		});
	} catch (error) {
		console.error('Get Products error:', error);
		return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}