import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parse } from "path";

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


export async function POST(
    request:Request,
){
    const currentUser = await getCurrentUser();
    
    if(!currentUser){
        return NextResponse.error();
    }
    
    const { interviewId, interviewDate } = await request.json();

    if(!interviewId || typeof interviewId !== "string"){
        throw new Error("Invalid ID");
    }
    if(!interviewDate){
        console.log("interviewDate:", interviewDate);
        throw new Error("No interview date");
    }

    const parsedInterviewDate = new Date(Date.parse(interviewDate));

    const updatedInterview = await prisma.interview.update({
        where: {
          id: interviewId,
          userId: currentUser.id,
        },
        data: {
          interviewDate: parsedInterviewDate
        },
      });   
    
      return NextResponse.json(updatedInterview);
}