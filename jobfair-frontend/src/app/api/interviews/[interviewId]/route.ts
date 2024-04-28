import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    interviewId?:string
}

export async function DELETE(
    request:Request,
    {params}:{params:IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    
    const {interviewId} = params;

    if(!interviewId || typeof interviewId !== "string"){
        throw new Error("Invalid ID");
    }

    const interview = await prisma.interview.delete({
        where:{
            id:interviewId,
            userId:currentUser.id
        }
    });

    return NextResponse.json(interview);
}