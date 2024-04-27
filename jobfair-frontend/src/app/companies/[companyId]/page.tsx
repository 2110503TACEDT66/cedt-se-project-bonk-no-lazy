import getCompanyById from "@/app/actions/getCompanyById"
import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import CompanyClient from "./CompanyClient"

interface IParams {
    companyId?: string
}

const CompanyPage = async ({
    params
}: { params: IParams }) => {
    const company = await getCompanyById(params)
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
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default CompanyPage