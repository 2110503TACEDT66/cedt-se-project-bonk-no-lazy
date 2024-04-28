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
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function MyProfilePage() {

    const currentUser = await getCurrentUser();
    const interviews = await getInterview({ userId: currentUser?.id });
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    if (interviews.length === 0) {
        return (
            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                <div className="w-full">
                    <ClientOnly>
                        <div className="flex w-full justify-center gap-5 p-5 items-center">
                            <EmptyState
                                title="No interviews found"
                                subtitle="Looks like you haven't booked any interviews."
                            />
                        </div>
                    </ClientOnly>
                </div>
            </Suspense>
        );
    }

    return (
        <main className="flex flex-col lg:flex-row  justify-between">
          <div className="ml-20 mt-5 w-full lg:w-1/3 lg:mx-auto max-[1024px]:flex justify-center">
            <ProfileCard currentUser={currentUser} />
          </div>
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col items-center justify-center gap-5 p-5 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
              <ClientOnly>
                <InterviewClient interviews={interviews} />
              </ClientOnly>
            </div>
          </div>
        </main>
      );
};