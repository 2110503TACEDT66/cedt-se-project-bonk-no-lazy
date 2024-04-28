'use client'

import { SafeCompany, SafeInterview, SafeUser } from "@/types"
import Image from "next/image";

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
        <div className="
        flex w-full
        ">
            <div className="w-[5em] h-[5em] relative ">
                <Image  src={companyData.imageSrc} className="
                object-cover w-full h-full rounded-lg
                " 
                layout="fill"
                alt="company photo"
                />
            </div>
            <div>
            <p> {companyData.name} </p>
            <p> {interviewData.interviewDate} </p>
            <p> {companyData.description} </p>
            </div>
        </div>
    )
}


export default InterviewCard ; 