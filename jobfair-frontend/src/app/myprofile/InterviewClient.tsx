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
import DeleteButton from "./OptionButton";
import { Router } from "next/router";

interface InterviewClientProps {
    interviews: SafeInterview[],
    currentUser?: SafeUser | null,
}

const InterviewClient: React.FC<InterviewClientProps> = ({
    interviews,
    currentUser
}) => {

    const router = useRouter();
    const [deleteId, setDeleteId] = useState('');

    const onCancel = useCallback((id: string) => {

        setDeleteId(id);
        console.log(`${process.env.DATABASE_URL}/api/interviews/${id}`)
        axios.delete(`${process.env.DATABASE_URL}/api/v1/interviews/${id}`)
            .then(() => {
                toast.success("Interview cancelled");
                router.refresh();
            })
            .catch((error) => {
                if (!error?.response) {
                    console.log("no error")
                }
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeleteId('');

            })
    }, [router]);

    return (
        <div className=" w-full  flex-column h-[100vh] ">
            <Heading
                title="Interviews"
                subtitle="Which company that you have booked with"
            />

            {
                interviews.map((interview: SafeInterview) => (
                    <div
                    className="flex-row  flex bg-slate-100 rounded-md
                    shadow-md hover:shadow-lg p-10 m-5 mx-0
                     "
                    >
                        <InterviewCard
                            companyData={interview.company}
                            interviewData={interview}
                        />
                        <div>
                        <DeleteButton
                            label={"Cancel Booking"}
                            onAction={onCancel}
                            actionId={interview.id}
                            action="delete"
                        />
                        </div>
                    </div>
                ))
            }

        </div>

    )
}

export default InterviewClient;