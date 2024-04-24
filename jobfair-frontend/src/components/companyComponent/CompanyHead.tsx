'use client'

import React from "react";
import { user } from "../../../interface";
import Heading from "../Heading";
import Image from "next/image";

interface CompanyHeadProps{
    title:string;
    imageSrc:string;
    id:string;
    currentUser?:user|null ;
}

const CompanyHead:React.FC<CompanyHeadProps> =({
    title,
    imageSrc,
    id,
    currentUser
})=>{
    const 
    return(
        <>
        <Heading
            title={title}
        />
        <div className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative
        ">
            <Image
            alt="Image" 
            src={imageSrc} 
            fill 
            className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                

            </div>
        </div>
        </>
    )
}

export default CompanyHead;