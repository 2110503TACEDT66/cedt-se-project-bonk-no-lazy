import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";
import { current } from "@reduxjs/toolkit";
import getInterview from "@/app/actions/getInterviews";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import InterviewClient from "./InterviewClient"
import ProfileCard from "@/components/ProfileCard";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default async function MyProfilePage() {

    const currentUser =  await getCurrentUser();
    const interviews = await getInterview({userId:currentUser?.id});
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title="Unauthorized"
                subtitle="Please login"
                />
            </ClientOnly>
        )
    }
    

    if (interviews.length === 0 && currentUser) {
    return (
        <div className="w-full">
            <ClientOnly>
                <div className="flex w-full justify-center gap-5 p-5 items-center">
                    <ProfileCard currentUser={currentUser} icon={FcGoogle} />
                    <EmptyState
                        title="No interviews found"
                        subtitle="Looks like you haven't booked any interviews."
                    />
                </div>
            </ClientOnly>
        </div>
    );
}


    return(
        <div className="w-full">
            <div className="flex w-full justify-center gap-5 p-5 items-center ">
                <ProfileCard currentUser={currentUser} icon={FcGoogle} />
                <ClientOnly>
                    <InterviewClient
                    interviews={interviews}
                    />
                </ClientOnly>
            </div>
        </div>
    );
}; 
