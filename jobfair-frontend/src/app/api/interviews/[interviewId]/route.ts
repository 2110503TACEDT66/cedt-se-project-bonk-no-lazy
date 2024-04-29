import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parse } from "path";

interface IParams {
    interviewId?:string
}

/**
 * @swagger
 * /api/interviews/[interviewId]:
 *   post:
 *     summary: Update interview date
 *     tags: [Interviews]
 *     description: Updates the date of the specified interview.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interviewId:
 *                 type: string
 *                 description: The ID of the interview to update.
 *               interviewDate:
 *                 type: string
 *                 format: date-time
 *                 description: The new date and time for the interview.
 *     responses:
 *       '200':
 *         description: Successfully updated interview date.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Interview'
 *       '400':
 *         description: Bad request, invalid input or missing required fields.
 *       '401':
 *         description: Unauthorized, user not authenticated.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/interviews/[interviewId]:
 *   delete:
 *     summary: Delete an interview
 *     tags: [Interviews]
 *     description: Deletes the specified interview.
 *     parameters:
 *       - in: path
 *         name: interviewId
 *         schema:
 *           type: string
 *         description: The ID of the interview to delete.
 *     responses:
 *       '200':
 *         description: Successfully deleted interview.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Interview'
 *       '400':
 *         description: Bad request, invalid input or missing required fields.
 *       '401':
 *         description: Unauthorized, user not authenticated.
 *       '500':
 *         description: Internal server error.
 */

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