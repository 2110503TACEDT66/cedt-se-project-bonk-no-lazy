import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import JobPositionClient from "./JobPositionClient"
import getJobPositionById from "@/app/actions/getJobPositionById";

interface IParams {
    jobPositionId?: string
}

const CompanyPage = async ({
    params
}: { params: IParams }) => {
    const jobPosition = await getJobPositionById(params)
    const currentUser = await getCurrentUser()

    if (!jobPosition) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <JobPositionClient
                jobPosition={jobPosition}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default CompanyPage