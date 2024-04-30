export default async function getJobById(params: { jobId: string }) {
  try {
    const { jobId } = params;

    const job = await prisma?.jobPosition.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: true,
      },
    });

    if (!job) {
      return null;
    }

    return {
      ...job,
      createdAt: job.createdAt.toString(),
      updatedAt: job.updatedAt.toString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
