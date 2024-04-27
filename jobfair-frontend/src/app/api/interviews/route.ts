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
        companyId,
        interviewDate,
    } = body

    if (!companyId || !interviewDate) {
        return NextResponse.error()
    }

    // Time in Database is UTC time, so dont worry if the interviewDate posted seems wrong, its correct.
    const companyAndInterview = await prisma.company.update({
        where: {
            id: companyId
        },
        data: {
            interviews: {
                create: {
                    userId: currentUser.id,
                    interviewDate,
                }
            }
        }
    })

    return NextResponse.json(companyAndInterview)
}