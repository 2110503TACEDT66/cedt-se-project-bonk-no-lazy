import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: The interview managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Interview:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the interview.
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the interview.
 *         companyId:
 *           type: string
 *           description: The ID of the company associated with the interview.
 *         interviewDate:
 *           type: string
 *           format: date-time
 *           description: The date and time of the interview.
 *         jobPositionId:
 *           type: string
 *           description: The ID of the job position associated with the interview.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the interview was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the interview was last updated.
 *       required:
 *         - userId
 *         - companyId
 *         - interviewDate
 *         - jobPositionId
 */


/**
 * @swagger
 * /api/interviews:
 *   post:
 *     summary: Schedule an interview
 *     tags: [Interviews]
 *     description: Schedules an interview for the specified company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: string
 *                 description: The ID of the company for which the interview is scheduled.
 *               interviewDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the interview.
 *               jobPositionId:
 *                 type: string
 *                 description: The ID of the job position for which the interview is scheduled.
 *     responses:
 *       '200':
 *         description: Successfully scheduled interview.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Interview'
 *       '400':
 *         description: Bad request, invalid input or missing required fields.
 *       '401':
 *         description: Unauthorized, user not authenticated.
 *       '403':
 *         description: Forbidden, user not allowed to schedule more interviews.
 *       '500':
 *         description: Internal server error.
 */
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
        jobPositionId,
    } = body

    if(currentUser.role !== "ADMIN"){
        const allInterviewOfThisUser = await prisma.interview.findMany({
            where: {
                userId: currentUser.id
            }
        });
        if (allInterviewOfThisUser.length >= 3) {
            return NextResponse.json({error:"You are only allowed to schedule a maximum of three interviews."},{status:403});
        }
    }
    

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
                    jobPositionId,
                }
            }
        }
    })

    return NextResponse.json(companyAndInterview)
}