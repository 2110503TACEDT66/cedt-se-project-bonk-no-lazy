import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import  getJobById  from "@/app/actions/getJobById";

interface DetailJobProps {
  params: {
    jobId: string;
  };
}

const DetailJob = async ({ params }: DetailJobProps) => {
  const job = await getJobById({ jobId: params.jobId });

  if (!job) {
    notFound();
  }

  return (
    <ClientOnly>
      <Container>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
            <p className="text-gray-500 mb-4">{job.description}</p>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Responsibilities:</h2>
              <ul className="list-disc list-inside">
                {job.responsibilities.map(
                  (responsibility: string, index: number) => (
                    <li key={index}>{responsibility}</li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Salary:</h2>
              <p>{job.salary}</p>
            </div>
          </div>
          <div className="flex-1">
            {/* Add any additional details or components here */}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default DetailJob;
