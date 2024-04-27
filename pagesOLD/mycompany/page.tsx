
import { Suspense } from "react"
import MyCompanyCard from "@/componentsOLD/MyCompanyCard"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
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
        <main>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <MyCompanyCard companyId={profile.data.companyID} ></MyCompanyCard>
            </Suspense>
        </main>
    )
}