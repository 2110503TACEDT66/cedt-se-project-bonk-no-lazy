import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";
import JobsClient from "./JobsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getJobPositions, { JobPositionParams } from "@/app/actions/getJobPositions";
import getCompanies, { CompaniesParams } from "@/app/actions/getCompanies";


import Container from "../../components/Container";
import JobPositionCard from "@/components/jobPositions/JobPositionCard";


interface JobsProp {
  searchParams1: JobPositionParams;
  searchParams: CompaniesParams;
}

const JobsPage = async ({ searchParams, searchParams1 }: JobsProp) => {
  const companies = await getCompanies(searchParams);
  const jobPositions = await getJobPositions(searchParams1);
  const currentUser = await getCurrentUser();

  if (jobPositions.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-28
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-10
          "
        >
          {jobPositions.map((jobPosition: any) => {
            return (
              <JobPositionCard
                currentUser={currentUser}
                key={jobPosition.id}
                data={jobPosition}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default JobsPage;