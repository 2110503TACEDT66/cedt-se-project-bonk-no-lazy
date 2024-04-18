'use client'
import Company from "@/app/(companyInfo)/company/page";
import getCompany from "@/libs/getCompany";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinearProgress } from "@mui/material";
import ReviewCatalog from "./ReviewCatalog";
export default function MyCompanyCard({user}:{user:userJSON}){
    console.log(user.data.role)
    console.log(user.data.companyID)
    const [company,setCompany] = useState<CompanyJson | null>(null);

    

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCompany(user.data.companyID);
                setCompany(data)
            } catch (error) {
                console.error('Failed to fetch Companies', error)
                setCompany(null)
            }
        }
        fetchData()
    }, [])
    if(!company){
        return <div>Loading...</div>;
    }
    if(user.data.role != 'company'){
        return(
            <div className="text-center " >no access to this route</div>
        )
    }
    console.log(company?.data)
    if (!company.data || company.data.length === 0) {
        return <div>No company data available</div>;
    }
 
    
    return(
        <div>
            <div className="flex flex-row">
                <Image 
                    src={company.data.quote}
                    alt="company Picture"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] h-[80vh] bg-black shadow-xl shadow-slate-500/50"
                />
                <div className="flex flex-col text-md mx-5 flex-auto text-center mb-10"> 
                    <h3 className="text-lg font-bold"> {company.data.name}</h3>
                    <div>Description : {company.data.description}</div>
                    <div>Address : {company.data.address}</div>
                    <div>
                        Website : <Link href={company.data.website} className="hover:text-sky-400"> {company.data.website}</Link>
                    </div>
                    <div>Tel. : {company.data.tel}</div>
                    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                        <ReviewCatalog companyId={user.data.companyID} addComment={null}/>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}