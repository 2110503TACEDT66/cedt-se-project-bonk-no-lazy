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
        rating,
        comment,
        companyId
    } = body

    // Time in Database is UTC time, so dont worry if the interviewDate posted seems wrong, its correct.
    const companyAndReview = await prisma.company.update({
        where: {
            id: companyId
        },
        data: {
            reviews: {
                create: {
                    userId: currentUser.id,
                    rating,
                    comment
                }
            }
        }
    })

    return NextResponse.json(companyAndReview)
}