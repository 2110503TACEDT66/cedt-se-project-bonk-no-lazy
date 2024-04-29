'use client'

import { Calendar } from "react-date-range";
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
        flex w-full items-center gap-20 text-center 
        ">
            <div className="w-[9em] h-[9em] relative mx-2 
           ">
                <Image  src={companyData.imageSrc} className="
                object-cover w-full h-full rounded-lg 
                " 
                layout="fill"
                alt="company photo"
                />
            </div>
            <div>
            <p className="font-bold text-2xl py-1" > {companyData.name} </p>
            
            <p className="text-sm text-slate-600 "> { "Booked Interview Date : " +   new Date(interviewData.interviewDate).toDateString()} </p>
            
            {/* <p> { "About us : " + companyData.description} </p> */}
            </div>
        </div>
    )
}


export default InterviewCard ; 