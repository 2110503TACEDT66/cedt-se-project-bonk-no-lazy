import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface UserParams {
    userId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: UserParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { userId } = params

    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid User Id')
    }

    const body = await request.json()

    const {
        role,
        companyId
    } = body

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            role,
            companyId,
        }
    })

    return NextResponse.json(user)
}