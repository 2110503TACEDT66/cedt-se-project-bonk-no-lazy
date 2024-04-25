
import prisma from "@/libs/prismadb"
import { use } from "react";

interface IParams{
    userId?:string;
    InterViewId?:string;
    companyId?:string,
}

export default async function getInterviewById(params:IParams) {
    try {
        const {userId,InterViewId} = params;
        const query :any ={};

        if(InterViewId){
            query.InterViewId = InterViewId ;
        }
        if(userId){
            query.userId = userId ;
        }

        const myInterviews = await prisma.interview.findMany({
            where:query,
            include:{
                user:true,
                companies:true,
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        const safeInterviews = myInterviews.map(
            (interview) => ({
                ...interview,
                createdAt:interview.createdAt.toISOString(),
                interviewDate:interview.interviewDate.toISOString(),
                updatedAt:interview.updatedAt.toISOString(),
                user:{
                    ...interview.user,
                    createdAt: interview.user.createdAt.toISOString(),
                    updatedAt: interview.user.updatedAt.toISOString(),
                },
                companies:{
                    ...interview.companies,
                    createdAt: interview.companies.createdAt.toISOString(),
                    updatedAt: interview.companies.updatedAt.toISOString(),
                },
            })
        );
        return safeInterviews;
    } catch (error : any){
        throw new Error(error);
    }
}