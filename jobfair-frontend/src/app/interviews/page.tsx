import getCurrentUser from "@/libs/getCurrentUser";
import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";
import { current } from "@reduxjs/toolkit";
import getInterview from "@/actions/getInterview";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import InterviewClient from "./InterviewClient"

const MyInterviewPage = async () => {

    const currentUser:SafeUser =  await getCurrentUser();
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

    if(interviews.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title = "No interviews found"
                subtitle="Looks like you haven't booking any interviews."
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <InterviewClient

            />
        </ClientOnly>
    );
}; 