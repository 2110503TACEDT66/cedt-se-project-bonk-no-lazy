import prisma from "@/libs/prismadb";

export interface JobPositionParams {
  companyId?: string;
}

export default async function getJobPositions(params?: JobPositionParams) {
  try {
    const {
      companyId,
    } = params || {}

    let query: any = {}

    if (companyId) {
      query.companyId = companyId
    }

    const JobPositions = await prisma.jobPosition.findMany({
      where: query,
      include: {
        company: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeJobPositions = JobPositions.map((jobPosition) => ({
      ...jobPosition,
      createdAt: jobPosition.createdAt.toISOString(),
      updatedAt: jobPosition.createdAt.toISOString(),
      company: {
        ...jobPosition.company,
        createdAt: jobPosition.company.createdAt.toISOString(),
        updatedAt: jobPosition.company.createdAt.toISOString(),
      },
    }));

    return safeJobPositions
  } catch (error: any) {
    throw new Error(error)
  }
}