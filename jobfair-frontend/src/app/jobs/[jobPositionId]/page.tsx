import getCompanyById from "@/app/actions/getCompanyById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getJobById from "@/app/actions/getJobById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import DetailJob from "./detailJobClient";

interface detailJobPositionParams {
  companyId?: string;
  jobId: string; // Make sure jobId is defined here
}

const detailJobPage = async ({
  params,
}: {
  params: detailJobPositionParams;
}) => {
  const company = await getCompanyById(params);
  const job = await getJobById({ jobId: params.jobId });
  const currentUser = await getCurrentUser();

  if (!company) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <DetailJob params={{ jobId: params.jobId }} />
    </ClientOnly>
  );
};

export default detailJobPage;
