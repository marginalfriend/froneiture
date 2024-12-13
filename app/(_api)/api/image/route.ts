import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { CreateImageDTO, DEFAULT_IMAGE_VALIDATION } from './image-types';
import prisma from '@/prisma/client/prisma';
import { unlink } from "node:fs/promises";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_API_KEY!
);

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
		const supabaseUser = await supabase.auth.getUser()
		console.log("Starting upload image...")
		console.log("Supabase URL: ", process.env.NEXT_PUBLIC_SUPABASE_URL)
		console.log("Supabase Key: ", process.env.SUPABASE_API_KEY)
		console.log("Supabase User: ", supabaseUser)

		const formData = await req.formData();
		const file = formData.get('file') as File;
		const productId = formData.get('productId') as string;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}
		console.log("File received.")

		if (!validateImage(file)) {
			return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
		}
		console.log("File is valid")

		// Generate a unique filename
		const uniqueFilename = generateUniqueFilename(file.name);
		console.log("Filename generated: ", uniqueFilename)

		// Convert file to buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		console.log("Converted image to buffer.")

		// Upload to Supabase storage
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('images') // Replace with your actual bucket name
			.upload(uniqueFilename, buffer, {
				cacheControl: '3600',
				upsert: false
			});
		console.log("Image uploaded to supabase. Path: ", uploadData?.fullPath)

		if (uploadError) {
			console.error('Supabase upload error:', uploadError);
			return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
		}

		// Get public URL
		const { data: { publicUrl } } = supabase.storage
			.from('images')
			.getPublicUrl(uniqueFilename);
		console.log("Public URL received: ", publicUrl)

		// Create image record in database
		const imageData: CreateImageDTO = {
			fileName: uniqueFilename,
			path: publicUrl,
			size: file.size,
			mimeType: file.type,
			width: undefined,
			height: undefined,
			description: null,
			productId: productId || undefined
		};
		console.log("Image data ready to be saved into database")

		const image = await prisma.image.create({ data: imageData });
		console.log("Image data saved in database. Sending response...")

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