import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";
import JobsClient from "./JobsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getJobPositions, { JobPositionParams } from "@/app/actions/getJobPositions";
import getCompanies from "@/app/actions/getCompanies";


import Container from "../../components/Container";
import JobPositionCard from "@/components/jobpositions/JobpositonCard";




interface JobsProp {
  searchParams: JobPositionParams;
}

// const JobsPage = async() => {
//     const currentUser = await getCurrentUser();

//     if(!currentUser) {
//         <ClientOnly>
//             <EmptyState
//                 title="Unautorized"
//                 subtitle= "Please login"/>
//         </ClientOnly>
//     }
// }
const JobsPage = async ({ searchParams }: JobsProp) => {
  const companies = await getCompanies;
  const jobPositions = await getJobPositions(searchParams);
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
      <JobsClient/>
      {/* <Container>
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
                // companies={companies}
              />
            );
          })}
        </div>
      </Container> */}
    </ClientOnly>
  );
};

export default JobsPage;