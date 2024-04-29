import getCompanyById from "@/app/actions/getCompanyById"
import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import CompanyClient from "./CompanyClient"
import getInterviews from "@/app/actions/getInterviews"
import getReviews from "@/app/actions/getReviews"

export interface IParams {
    companyId?: string
}

const CompanyPage = async ({
    params
}: { params: IParams }) => {
    const company = await getCompanyById(params)
    const interviews = await getInterviews(params)
    const reviews = await getReviews(params)
    const currentUser = await getCurrentUser()

    if (!company) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <CompanyClient 
                company={company}
                interviews={interviews}
                reviews={reviews}
                currentUser={currentUser}
                params={params}
            />
        </ClientOnly>
    )
}

export default CompanyPage