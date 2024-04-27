import prisma from "@/libs/prismadb"

interface InterviewParams{
    userId?:string;
    interviewId?:string;
    companyId?:string;
}

export default async function getInterviews(params: InterviewParams) {
    try {
        const {
            userId,
            interviewId,
            companyId,
        } = params;

        const query :any ={};

        if(companyId){
            query.companyId = companyId;
        }
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
                company: true,
            },
            orderBy:{
                createdAt: "desc"
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
                company:{
                    ...interview.company,
                    createdAt: interview.company.createdAt.toISOString(),
                    updatedAt: interview.company.updatedAt.toISOString(),
                },
            })
        );

        return safeInterviews;
    } catch (error : any){
        throw new Error(error);
    }
}