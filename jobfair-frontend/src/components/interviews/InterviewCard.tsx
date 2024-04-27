'use client'

import { SafeCompany, SafeInterview } from "@/types"
import CompanyCard from "../companies/CompanyCard";

interface InterviewProps{
    companyData:SafeCompany;
    interviewData:SafeInterview;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const InterviewCard:React.FC<InterviewProps> = ({
    companyData,
    interviewData,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {
    return (
        <div className=" flex flex-row">
            {
                <CompanyCard 
                key={companyData.id} data={companyData} 
                disabled={true} onAction={()=>{}}
                />

            }
        </div>
    )
}


export default InterviewCard ; 