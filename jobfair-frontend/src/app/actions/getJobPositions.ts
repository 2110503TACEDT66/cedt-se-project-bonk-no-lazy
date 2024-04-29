import prisma from "@/libs/prismadb";

export interface JobPositionParams {
  companyId?: string;
  interviewDate?: string;
  category?: string;
}

export default async function getJobPositions(params: JobPositionParams) {
  try {
    const { companyId, interviewDate, category } = params;

    let query: any = {};

    if (companyId) {
      query.companyId = companyId;
    }

    if (category) {
      query.category = category;
    }

    if (interviewDate) {
      query.interviewDate = interviewDate;
    }
    const Jobs = await prisma.jobPosition.findMany({
      where: query,
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

     const safeJobs = Jobs.map((job) => ({
       ...job,
       createdAt: job.createdAt.toISOString(),
       updatedAt: job.updatedAt.toISOString(),
       company: {
         ...job.company,
         createdAt: job.company.createdAt.toISOString(),
         updatedAt: job.company.updatedAt.toISOString(),
       },
     }));
    // กำหนดข้อมูลเพิ่มเติมของตำแหน่งงานก่อนที่จะส่งออก
    
     return safeJobs;
  } catch (error: any) {
    throw new Error(error);
  }
}
