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


    const interview = await prisma.interview.findUnique({
        where: {
            id: interviewId,
        }
    });

    if (!interview || (interview.userId !== currentUser.id && currentUser.role !== "ADMIN")) {
        return NextResponse.json({ message: "Interview not found" }, { status: 404 });
    }

    await prisma.interview.delete({
        where: {
            id: interviewId,
        }
    });

    return NextResponse.json(interview);
}


export async function POST(
    request: Request,
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { interviewId, interviewDate } = await request.json();
  
    if (!interviewId || typeof interviewId!== "string") {
      throw new Error("Invalid ID");
    }
    if (!interviewDate) {
      console.log("interviewDate:", interviewDate);
      throw new Error("No interview date");
    }
  
    const parsedInterviewDate = new Date(Date.parse(interviewDate));
  
    let whereClause;
    if (currentUser.role === "ADMIN") {
      whereClause = { id: interviewId };
    } else {
      whereClause = { id: interviewId, userId: currentUser.id };
    }
  
    const updatedInterview = await prisma.interview.update({
      where: whereClause,
      data: {
        interviewDate: parsedInterviewDate,
      },
    });
  
    return NextResponse.json(updatedInterview);
  }