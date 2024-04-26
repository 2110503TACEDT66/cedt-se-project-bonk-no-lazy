import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";
import { current } from "@reduxjs/toolkit";
import getInterview from "@/app/actions/getInterview";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import InterviewClient from "../interviews/InterviewClient"
import ProfileCard from "@/components/ProfileCard";
import { FcGoogle } from "react-icons/fc";

export default async function MyProfilePage() {

    const currentUser =  await getCurrentUser();
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
    
    const interviews = await getInterview({userId:currentUser.id});

    if(interviews.length === 0 && !currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title = "No interviews found"
                subtitle="Looks like you haven't booking any interviews."
                />
            </ClientOnly>
        )
    }

    if(interviews.length === 0 && currentUser){
        return(
            <div className="w-full">
                <ClientOnly>
                <div className="flex w-[80%] gap-5  p-5 items-center">
                    <ProfileCard currentUser={currentUser} icon={FcGoogle} />
                        <EmptyState
                        title = "No interviews found"
                        subtitle="Looks like you haven't booking any interviews."
                        />
                </div> 
                </ClientOnly>
            </div>
        )
    }

    return(
        <div className="w-full">
            <div className="flex w-[80%] gap-5 p-5 items-center ">
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
