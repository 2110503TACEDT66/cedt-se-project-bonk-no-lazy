import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface FavParams {
    companyId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: FavParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { companyId } = params

    if (!companyId || typeof companyId !== 'string') {
        throw new Error('Invalid Id')
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])]

    favouriteIds.push(companyId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favouriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(
    request: Request,
    { params }: { params: FavParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { companyId } = params

    if (!companyId || typeof companyId !== 'string') {
        throw new Error('Invalid Id')
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])]

    favouriteIds = favouriteIds.filter((id) => id !== companyId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favouriteIds
        }
    })

    return NextResponse.json(user)
}