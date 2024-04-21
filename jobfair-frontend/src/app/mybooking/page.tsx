import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BookingList from "@/componentsOLD/BookingList"
import getUserProfile from "@/libs/getUserProfile";
import getInterviews from "@/libs/getInterviews"

export default async function MyBookingPage(){
    const session = await getServerSession(authOptions)
    var profile;
    var interviews
    var token = ''

    if (session) {
        profile = await getUserProfile(session.user.token)
        interviews = await getInterviews(session.user.token);
        token = session.user.token

        var interviewsJsonReady = await interviews;
        if(!interviewsJsonReady){
            interviewsJsonReady = await getInterviews(session.user.token);
        }
        if(!interviewsJsonReady){
            throw new Error('Failed to fetch Interviews')
        }
        console.log(interviewsJsonReady)
    }

    
    return(
        <main className="my-5 text-center flex flex-col">
            <div className="text-2xl font-medium text-center text-teal-500 mt-8 transition transform duration-150 hover:text-cyan-900">
                Your Interview Sessions
            </div>
            <BookingList user={profile} token={token} interviewJson={interviewsJsonReady}></BookingList>
        </main>
    )
}