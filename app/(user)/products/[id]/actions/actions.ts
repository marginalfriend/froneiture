"use server"

import prisma from "@/prisma/client/prisma";

interface FormSchema {
	productId: string;
	name: string;
	email: string;
	phoneNumber: string;
}

export async function sendInquiry(formData: FormSchema) {
	const data = await prisma.inquiry.create({
		data: formData
	})

	console.log(data)

	return data
}