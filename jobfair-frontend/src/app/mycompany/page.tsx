
import { Suspense } from "react"
import MyCompanyCard from "@/components/MyCompanyCard"
import { useSession } from "next-auth/react"
import getInterviews from "@/libs/getInterviews"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import getCompany from "@/libs/getCompany"
import LinearProgress from "@mui/material/LinearProgress"

export default async function MyCompanyPage(){
    const session = await getServerSession(authOptions)
    var profile;
    var token = ''

    if (session) {
        profile = await getUserProfile(session.user.token)
        token = session.user.token
    }
    return(
        <main className="m-5">
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <MyCompanyCard user={profile} ></MyCompanyCard>
            </Suspense>
        </main>
    )
}