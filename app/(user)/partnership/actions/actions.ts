"use server"

import prisma from "@/prisma/client/prisma";

interface FormSchema {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	reference: string;
}

export async function sendPartnership(formData: FormSchema) {
	const data = await prisma.partnership.create({
		data: formData
	})

	console.log(data)

	return data
}