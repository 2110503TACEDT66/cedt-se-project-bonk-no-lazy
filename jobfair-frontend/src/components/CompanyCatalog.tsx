'use client'

import Link from "next/link";
import Card from "./Card";
import getCompanies from "@/libs/getCompanies";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

export default function CompanyCatalog({companyJson}:{companyJson:Promise<CompanyJson>}){

    const [companies, setCompanies] = useState<CompanyJson | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCompanies();
                setCompanies(data)
            } catch (error) {
                console.error('Failed to fetch Companies', error)
            }
        }
        fetchData()
    }, [])

    if (!companies) {
        return <div>Loading...<LinearProgress/></div>
    }

    return(
        <>
        Explore {companies.count} Companies in our event
            <div className="m-20 flex flex-row items-center justify-around flex-wrap p-10 ">
            {
                companies.data.map((CompanyItem)=>(
                    <Link href={`/company/${CompanyItem.id}`} className="w-1/5">
                        <Card companyName={CompanyItem.name} imgSrc={CompanyItem.quote} />
                    </Link>
                ))
            }
            </div>
        </>
    )
} 

