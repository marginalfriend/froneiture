"use server"

import prisma from "@/prisma/client/prisma";
import z from "zod"

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


const formSchema = z.object({
	name: z.string().min(3, "Name must contains at least 3 characters"),
	email: z.string().email("Invalid email format"),
	phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
	address: z.string().min(10, "Address must contains at least 10 characters"),
	reference: z.string(),
});

export async function sendPartnership(formData: z.infer<typeof formSchema>) {
	const data = await prisma.partnership.create({
		data: formData
	})

	return data
}