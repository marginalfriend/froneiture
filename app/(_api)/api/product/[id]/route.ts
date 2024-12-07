import prisma from "@/prisma/client/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id
		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				images: true,
				designStyle: true,
				unitType: true,
			}
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		console.error('Get Product error:', error);
		return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
	}
}