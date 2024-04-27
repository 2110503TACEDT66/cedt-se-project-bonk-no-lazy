'use client'

import Heading from "@/components/Heading";
import { SafeInterview, SafeUser } from "@/types"
import { Container } from "@mui/material";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import CompanyCard from "@/components/companies/CompanyCard";
import InterviewCard from "@/components/interviews/InterviewCard";

interface InterviewClientProps{
    interviews:SafeInterview[],
    currentUser?:SafeUser|null,
}

const InterviewClient:React.FC<InterviewClientProps>=({
    interviews,
    currentUser
}) => {
    
    const router = useRouter();
    const [deleteId,setDeleteId] = useState('');

    const onCancel = useCallback((id:string) =>{
        setDeleteId(id);

        axios.delete(`api/interviews/${id}`)
        .then(()=>{
            toast.success("Interview cancelled");
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeleteId('');
        })
    },[router]);

    return(
        <div  >
            <Heading 
            
            title="Interviews"
            subtitle="Which company that you have booked with"
            />
            <div
                className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                "
            >
                {
                    interviews.map((interview:SafeInterview)=>(
                        <InterviewCard 
                            companyData={interview.company}
                            interviewData={interview}
                         />
                    ))
                }
            </div>
        </div>
    )
}

export default InterviewClient;