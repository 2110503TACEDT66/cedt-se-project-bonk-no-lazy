'use client'

import Heading from "@/components/Heading";
import { SafeInterview, SafeUser } from "@/types"
import { Container } from "@mui/material";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import InterviewCard from "@/components/interviews/InterviewCard";
import OptionButton from "./OptionButton";
import { Router } from "next/router";
import useUpdateModal from "@/hooks/useUpdateModal";

interface InterviewClientProps {
    interviews: SafeInterview[],
    currentUser?: SafeUser | null,
}

const InterviewClient: React.FC<InterviewClientProps> = ({
    interviews,
    currentUser
}) => {

    const router = useRouter();

    const updateModal = useUpdateModal();

    const onCancel = useCallback((id: string) => {
        axios.delete(`/api/interviews/${id}`)
            .then(() => {
                toast.success("Interview cancelled");
                router.refresh();
            })
            .catch((error) => {
                if (!error?.response) {
                    console.log("no error")
                }
                toast.error(error?.message)
            })
    }, [router]);

    return (
        <div className=" w-full ">
            <Heading
                title="Interviews"
                subtitle="Which company that you have booked with"
            />

            <Container maxWidth="md">
                {
                    interviews.map((interview: SafeInterview) => (
                        <div
                        className="flex-row  flex bg-slate-100 rounded-md
                        shadow-md hover:shadow-lg py-5 px-0 my-5 mx-0
                         "
                        >
                            <InterviewCard
                                companyData={interview.company}
                                interviewData={interview}
                            />
                            <div className="flex flex-col justify-between">
                            <OptionButton
                                label={"Update Booking"}
                                onAction={()=>{}}  // updateModal.onOpen
                                actionId={"0"}
                                action="update"
                            />
                            <OptionButton
                                label={"Cancel Booking"}
                                onAction={onCancel}
                                actionId={interview.id}
                                action="delete"
                            />
                            </div>
                        </div>
                    ))
                }
            </Container>

        </div>

    )
}

export default InterviewClient;