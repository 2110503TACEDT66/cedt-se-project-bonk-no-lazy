
import prisma from "@/libs/prismadb"

interface InterviewParams{
    userId?:string;
    interviewId?:string;
    companyId?:string;
}

export default async function getInterviews(params?: InterviewParams) {
    try {
        const {
            userId,
            interviewId,
            companyId,
        } = params || {};

        const query :any ={};

        if(interviewId){
            query.interviewId = interviewId;
        }
        if(userId){
            query.userId = userId;
        }

        const interviews = await prisma.interview.findMany({
            where: query,
            include:{
                user: true,
                companies: true,
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        const safeInterviews = interviews.map((interview) => ({
                ...interview,
                createdAt: interview.createdAt.toISOString(),
                updatedAt: interview.updatedAt.toISOString(),
                interviewDate: interview.interviewDate.toISOString(),
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