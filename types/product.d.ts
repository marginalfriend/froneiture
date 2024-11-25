declare global {
	interface ProductSchema {
		name: string;
		description: string;
		designStyleId: number;
		unitTypeId: number;
		locationId: number;
		images: File[]
	}

	interface CreateProduct {
		name: string;
		description: string;
		designStyleId: number;
		unitTypeId: number;
		locationId: number;
		imageIds: string[];
	}

	interface UpdateProduct extends CreateProduct {
		id: string;
	}
}

export { }