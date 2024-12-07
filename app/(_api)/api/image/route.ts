import { NextRequest, NextResponse } from 'next/server';
import { mkdir, access } from 'fs/promises';
import { join } from 'path';
import { CreateImageDTO, DEFAULT_IMAGE_VALIDATION } from './image-types';
import prisma from '@/prisma/client/prisma';
import { unlink } from "node:fs/promises";
import { promises } from 'fs';

// Ensure upload directory exists
async function ensureUploadDirectory() {
	const uploadDir = join(process.cwd(), 'public', 'uploads');
	try {
		await access(uploadDir);
	} catch {
		await mkdir(uploadDir, { recursive: true });
	}
	return uploadDir;
}

// Validate image file
function validateImage(file: File): { isValid: boolean; error?: string } {
	const { maxFileSize, allowedMimeTypes } = DEFAULT_IMAGE_VALIDATION;

	if (!file) return { isValid: false, error: 'No file provided' };
	if (file.size > maxFileSize) return { isValid: false, error: 'File size exceeds limit' };
	if (!allowedMimeTypes.includes(file.type)) return { isValid: false, error: 'Invalid file type' };

	return { isValid: true };
}

// Generate unique filename
function generateUniqueFilename(originalName: string): string {
	const timestamp = Date.now();
	const random = Math.round(Math.random() * 1000);
	const extension = originalName.split('.').pop();
	return `${timestamp}-${random}.${extension}`;
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get('file') as File;
		const productId = formData.get('productId') as string;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		if (!validateImage(file)) {
			return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
		}

		const uploadDir = await ensureUploadDirectory();
		const uniqueFilename = generateUniqueFilename(file.name);
		const filePath = join(uploadDir, uniqueFilename);
		const relativePath = `/uploads/${uniqueFilename}`;

		// Write file
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer)
		await promises.writeFile(filePath, buffer);

		// Create image record
		const imageData: CreateImageDTO = {
			fileName: uniqueFilename,
			path: relativePath,
			size: file.size,
			mimeType: file.type,
			width: undefined,
			height: undefined,
			description: null,
			productId: productId || undefined
		};

		const image = await prisma.image.create({ data: imageData });

		return NextResponse.json(image, { status: 201 });

	} catch (error) {
		console.error('Image upload error:', error);
		return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
	}
}

// Delete multiple images
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const ids = searchParams.get('ids')?.split(',');

		if (!ids?.length) {
			return NextResponse.json({ error: 'Image IDs required' }, { status: 400 });
		}

		const deleteResult = await prisma.$transaction(async (prisma) => {
			// Get image details first for cleanup
			const images = await prisma.image.findMany({
				where: { id: { in: ids } }
			});

			// Delete from database
			await prisma.image.deleteMany({
				where: { id: { in: ids } }
			});

			return images;
		});

		// Optionally clean up files from storage
		// This could be moved to a background job if needed
		deleteResult.forEach(async (image) => {
			try {
				const filePath = join(process.cwd(), 'public', image.path);
				await unlink(filePath);
			} catch (error) {
				console.error(`Failed to delete file: ${image.path}`, error);
			}
		});

		return NextResponse.json({
			message: 'Images deleted successfully',
			deletedImages: deleteResult
		});

	} catch (error) {
		console.error('Image deletion error:', error);
		return NextResponse.json({ error: 'Image deletion failed' }, { status: 500 });
	}
}

// Update images (for updating metadata like description)
export async function PUT(req: NextRequest) {
	try {
		const updates = await req.json();

		if (!Array.isArray(updates)) {
			return NextResponse.json({ error: 'Invalid update data format' }, { status: 400 });
		}

		const updatedImages = await prisma.$transaction(
			updates.map(({ id, ...data }) =>
				prisma.image.update({
					where: { id },
					data
				})
			)
		);

		return NextResponse.json({
			message: 'Images updated successfully',
			images: updatedImages
		});

	} catch (error) {
		console.error('Image update error:', error);
		return NextResponse.json({ error: 'Image update failed' }, { status: 500 });
	}
}