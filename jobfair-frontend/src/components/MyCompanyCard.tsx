'use client'
import getCompany from "@/libs/getCompany";
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
 
    const companyItem = company.data[0];
    return(
        <div>
            <div className="flex flex-row">
                <Image 
                    src={companyItem.quote}
                    alt="company Picture"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] h-[80vh] bg-black shadow-xl shadow-slate-500/50"
                />
                <div className="flex flex-col text-md mx-5 flex-auto text-center mb-10"> 
                    <h3 className="text-lg font-bold"> {companyItem.name}</h3>
                    <div>Description : {companyItem.description}</div>
                    <div>Address : {companyItem.address}</div>
                    <div>
                        Website : <Link href={companyItem.website} className="hover:text-sky-400"> {companyItem.website}</Link>
                    </div>
                    <div>Tel. : {companyItem.tel}</div>
                    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                        <ReviewCatalog companyId={user.data.companyID} addComment={null}/>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}