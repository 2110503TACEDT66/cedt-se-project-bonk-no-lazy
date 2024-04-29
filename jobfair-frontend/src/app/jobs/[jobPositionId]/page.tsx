import getJobPositions from "@/app/actions/getJobPositions";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import JobsClient from "../JobsClient";

interface IParams {
  jobsId?: string;
}

const JobPositionPage = async ({ params }: { params: IParams }) => {
    const jobPosition = await getJobPositions()

    if(!jobPosition) {
         return (
           <ClientOnly>
             <EmptyState />
           </ClientOnly>
         );
    }
    // return (
    //   <ClientOnly>
    //     <JobsClient
            
    //     />
    //   </ClientOnly>
    // );
};

export default JobPositionPage;
