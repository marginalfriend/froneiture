import { Product } from "@prisma/client";

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

	interface ProductCardProps extends Product {
		images: { path: string }[];
		location: { name: string };
		designStyle: { name: string };
		unitType: { name: string };
	}

	interface ResponseMeta {
		total: number,
		page: number,
		limit: number,
		totalPages: number
	}

	interface GetAllProductsResponse {
		data: ProductCardProps[],
		meta: ResponseMeta
	}
}

export { }