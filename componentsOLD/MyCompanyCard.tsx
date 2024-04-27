'use client'

import Image from "next/image"
import getCompany from "@/libs/getCompany";
import Link from "next/link";
import { Button, LinearProgress, Rating, TextField } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import ReviewCatalog from "@/componentsOLD/ReviewCatalog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview";
import getReviewsByCompanyId from "@/libs/getReviewsByCompanyId";

export default function MyCompanyCard({companyId}:{companyId:string}){
          
    const [companyDetail, setCompanyDetail] = useState<any>(null);

    useEffect(() => {
        const fetchCompany = async () => {
            const data = await getCompany(companyId);
            setCompanyDetail(data);
        };

        fetchCompany();
    }, [companyId]);

    if (!companyDetail) {
        return <div>Loading...<LinearProgress/></div>;
    }
    return(
        <main className="p-5 pb-0">
            <div className="flex flex-col">
                <div className="flex flex-col text-md mx-5 flex-auto text-center mb-10"> 
                    <div className="bg-slate-200 rounded rounded-b-lg rounded-t-xl flex flex-col text-center w-full shadow-2xl shadow-slate-400/50">
                        <Image 
                            src={companyDetail.data.quote}
                            alt="company Picture"
                            width={0} height={0} sizes="100vw"
                            className="rounded-t-lg w-full h-[70vh] bg-black flex-auto object-cover mb-2"
                        />
                        <h3 className="text-lg font-bold text-black"> {companyDetail.data.name}</h3>
                        <div className="text-black">{companyDetail.data.description}</div>
                        <div className="text-black">{companyDetail.data.address}</div>
                        <div className="text-black">
                            <Link href={companyDetail.data.website} className="hover:text-sky-400"> {companyDetail.data.website}</Link>
                        </div>
                        <div className="text-black">{companyDetail.data.tel}</div>
                    </div>
                    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                        <ReviewCatalog companyId={companyId} addComment={null}/>
                    </Suspense>
                </div>
            </div>
        </main>
    )
}
