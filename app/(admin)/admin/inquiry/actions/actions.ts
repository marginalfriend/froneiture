"use server"

import prisma from "@/prisma/client/prisma"
import { Status } from "@prisma/client"

export const updateInquiryStatus = async ({ id, status }: { id: number, status: Status }) => {
	try {
		await prisma.inquiry.update({
			where: {
				id
			},
			data: {
				status
			}
		})
	} catch (error) {
		console.log(error)
	}
}