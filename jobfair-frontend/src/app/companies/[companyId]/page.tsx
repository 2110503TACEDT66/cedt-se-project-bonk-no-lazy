import getCompany from "@/libs/getCompany";
import { useSession } from "next-auth/react";
import { CompanyItem,CompanyJson } from "../../../../interface";
import toast from "react-hot-toast";
import { fetchData } from "next-auth/client/_utils";
import { useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "@/libs/getCurrentUser";

interface Params {
    companyid?: string; 
}

const CompanyPage = ({params}:{
    params:Params
})=>{
    const [company,setCompany] = useState<CompanyJson | null>();
    const [companyDetail,setCompanyDetail] = useState<CompanyItem>();
    const currentUser = getCurrentUser();
    const fetchCompany = async ()=>{
        try{
            const companyJson = await getCompany(params.companyid || '');
            setCompany(companyJson);
        }catch(error){
            toast.error("failed to fetch company");
            return null;
        }
    };
    const fetchCompanyDetail = async ()=>{
        try {
            setCompanyDetail(company?.datal);
        } catch (error) {
            toast.error("failed to get company data");
            return null; 
        }
    }
    if(params.companyid){
        fetchCompany();
    }else{
        return(
            <div className="text-center top-5rem">
                NO Company Data Available
            </div>
        )
    }
    if(company){
        fetchCompanyDetail();
    }
    return (
        <ClientOnly>
            <CardClient
            company={companyDetail}
            currentUser={currentUser}
            >

            </CardClient>
        </ClientOnly>
    )
}

export default CompanyPage;