import prisma from "@/prisma/client/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { name } = await req.json();

		if (!name) {
			return NextResponse.json({ error: 'Name is required' }, { status: 400 });
		}

		const designStyle = await prisma.designStyle.create({
			data: { name }
		});

		return NextResponse.json(designStyle, { status: 201 });
	} catch (error) {
		console.error('Create designStyle error:', error);
		return NextResponse.json({ error: 'Failed to create unit type' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const skip = (page - 1) * limit;

		const [designStyles, total] = await Promise.all([
			prisma.designStyle.findMany({
				skip,
				take: limit,
				orderBy: { id: 'desc' }
			}),
			prisma.designStyle.count()
		]);

		return NextResponse.json({
			data: designStyles,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit)
			}
		});
	} catch (error) {
		console.error('Get designStyles error:', error);
		return NextResponse.json({ error: 'Failed to fetch unit types' }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { id, name } = await req.json();

		if (!id || !name) {
			return NextResponse.json({ error: 'ID and name are required' }, { status: 400 });
		}

		const updateddesignStyle = await prisma.designStyle.update({
			where: { id: Number(id) },
			data: { name }
		});

		return NextResponse.json(updateddesignStyle);
	} catch (error) {
		console.error('Update designStyle error:', error);
		return NextResponse.json({ error: 'Failed to update unit type' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'ID is required' }, { status: 400 });
		}

		await prisma.designStyle.delete({
			where: { id: Number(id) }
		});

		return NextResponse.json({ message: 'Unit type deleted successfully' });
	} catch (error) {
		console.error('Delete designStyle error:', error);
		return NextResponse.json({ error: 'Failed to delete unit type' }, { status: 500 });
	}
}