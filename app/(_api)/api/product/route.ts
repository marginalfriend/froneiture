import prisma from '@/prisma/client/prisma';
import { Image } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Create Product
export async function POST(req: NextRequest) {
	try {
		const {
			name,
			price,
			description,
			designStyleId,
			unitTypeId,
			imageIds
		} = await req.json();

		// Validate required fields
		if (!name || !description || !designStyleId || !unitTypeId) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Create product with optional images
		const product = await prisma.product.create({
			data: {
				name,
				description,
				price,
				designStyleId: Number(designStyleId),
				unitTypeId: Number(unitTypeId),
				images: imageIds ? {
					connect: imageIds.map((id: string) => ({
						id: id
					}))
				} : undefined
			},
			include: {
				images: true,
				designStyle: true,
				unitType: true,
			}
		});

		return NextResponse.json(product, { status: 201 });
	} catch (error) {
		console.error('Create Product error:', error);
		return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
	}
}

// Get Products
export async function GET() {
	try {

		const products = await prisma.product.findMany({
			include: {
				images: {
					select: {
						id: true,
						path: true,
					}
				},
				designStyle: { select: { name: true } },
				unitType: { select: { name: true } },
			},
			orderBy: { name: 'asc' }
		})

		return NextResponse.json({
			data: products
		});
	} catch (error) {
		console.error('Get Products error:', error);
		return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}

// Update Product
export async function PUT(req: NextRequest) {
	try {
		const reqData = await req.json();
		const {
			id,
			name,
			description,
			price,
			designStyleId,
			unitTypeId,
			images,
			deletedImageIds // New parameter to specify images to be deleted
		} = reqData


		if (!id) {
			return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
		}

		if (deletedImageIds && deletedImageIds[0]) {
			const baseUrl = process.env.BASE_URL
			const ids = deletedImageIds.join(",")
			const url = `${baseUrl}/api/image?ids=${ids}`
			await fetch(url, {
				method: "DELETE",
			})

		}

		// Update product with selective image management
		const product = await prisma.$transaction(async (prisma) => {
			// Delete specific images if deletedImageIds is provided

			// Update product
			return prisma.product.update({
				where: { id },
				data: {
					name,
					description,
					price,
					designStyleId: designStyleId ? Number(designStyleId) : undefined,
					unitTypeId: unitTypeId ? Number(unitTypeId) : undefined,
					images: images[0] ? {
						create: images.map((image: Image) => ({
							fileName: image.fileName,
							path: image.path,
							size: image.size,
							mimeType: image.mimeType,
							width: image.width,
							height: image.height,
							description: image.description
						}))
					} : undefined
				},
				include: {
					images: true,
					designStyle: true,
					unitType: true,
				}
			});
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('Update Product error:', error);
		return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
	}
}

// Delete Product
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
		}

		await prisma.$transaction([
			// Delete associated images first
			prisma.image.deleteMany({ where: { productId: id } }),
			// Then delete the product
			prisma.product.delete({ where: { id } })
		]);

		return NextResponse.json({ message: 'Product deleted successfully' });
	} catch (error) {
		console.error('Delete Product error:', error);
		return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
	}
}