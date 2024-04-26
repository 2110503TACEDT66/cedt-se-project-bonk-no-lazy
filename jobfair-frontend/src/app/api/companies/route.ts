import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        name,
        description,
        imageSrc,
        category,
        address,
        location,
        website,
        tel,
    } = body

    const company = await prisma.company.create({
        data: {
            name,
            description,
            imageSrc,
            category,
            address,
            locationValue:  location.value,
            website,
            tel,
            userId: currentUser.id,
        }
    })

    return NextResponse.json(company)
}