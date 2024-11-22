import prisma from '@/prisma/client/prisma';
import { Image } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Create Product
export async function POST(req: NextRequest) {
	try {
		const {
			name,
			description,
			designStyleId,
			unitTypeId,
			locationId,
			images
		} = await req.json();

		// Validate required fields
		if (!name || !description || !designStyleId || !unitTypeId || !locationId) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Create product with optional images
		const product = await prisma.product.create({
			data: {
				name,
				description,
				designStyleId: Number(designStyleId),
				unitTypeId: Number(unitTypeId),
				locationId: Number(locationId),
				images: images ? {
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
				location: true
			}
		});

		return NextResponse.json(product, { status: 201 });
	} catch (error) {
		console.error('Create Product error:', error);
		return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
	}
}

// Get Products
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const skip = (page - 1) * limit;

		const [products, total] = await Promise.all([
			prisma.product.findMany({
				skip,
				take: limit,
				include: {
					images: {
						select: {
							path: true
						}
					},
					designStyle: true,
					unitType: true,
					location: true
				},
				orderBy: { name: 'asc' }
			}),
			prisma.product.count()
		]);

		return NextResponse.json({
			data: products,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit)
			}
		});
	} catch (error) {
		console.error('Get Products error:', error);
		return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}

// Get Single Product
// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// 	try {
// 		const product = await prisma.product.findUnique({
// 			where: { id: params.id },
// 			include: {
// 				images: true,
// 				designStyle: true,
// 				unitType: true,
// 				location: true
// 			}
// 		});

// 		if (!product) {
// 			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
// 		}

// 		return NextResponse.json(product);
// 	} catch (error) {
// 		console.error('Get Product error:', error);
// 		return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
// 	}
// }

// Update Product
export async function PUT(req: NextRequest) {
	try {
		const {
			id,
			name,
			description,
			designStyleId,
			unitTypeId,
			locationId,
			images
		} = await req.json();

		if (!id) {
			return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
		}

		// Update product with optional image management
		const product = await prisma.$transaction(async (prisma) => {
			// First, delete existing images if new images are provided
			if (images) {
				await prisma.image.deleteMany({ where: { productId: id } });
			}

			// Update product
			return prisma.product.update({
				where: { id },
				data: {
					name,
					description,
					designStyleId: designStyleId ? Number(designStyleId) : undefined,
					unitTypeId: unitTypeId ? Number(unitTypeId) : undefined,
					locationId: locationId ? Number(locationId) : undefined,
					images: images ? {
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
					location: true
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