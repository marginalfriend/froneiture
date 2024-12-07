// Image interface representing the database model
export interface Image {
	id: string;
	fileName: string;
	path: string;
	size: number;
	mimeType: string;
	width?: number | null;
	height?: number | null;
	description?: string | null;
	createdAt: Date;
	updatedAt: Date;
	productId?: string | null;
}

// Type for creating a new image (omitting auto-generated fields)
export type CreateImageDTO = Omit<Image, 'id' | 'createdAt' | 'updatedAt' | 'productId'> & {
	productId?: string;
}

// Type for updating an existing image
export type UpdateImageDTO = Partial<CreateImageDTO> & {
	id: string;
}

// Validation schema for image upload
export interface ImageUploadValidation {
	maxFileSize: number; // in bytes
	allowedMimeTypes: string[];
	maxWidth?: number;
	maxHeight?: number;
}

// Default image upload validation
export const DEFAULT_IMAGE_VALIDATION: ImageUploadValidation = {
	maxFileSize: 5 * 1024 * 1024, // 5MB
	allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
	maxWidth: 3840,
	maxHeight: 2160
};