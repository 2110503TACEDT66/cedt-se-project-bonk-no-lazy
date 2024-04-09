'use client'
import { DatePicker } from "@mui/x-date-pickers"
import{ AdapterDayjs }from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers"
import { Select,MenuItem } from "@mui/material"
import { Dayjs } from "dayjs"
import { useState } from "react"
import getCompanies from "@/libs/getCompanies"
import { useEffect } from "react"

export default function DateReserve({onDateChange,onCompanyChange}
    :{onDateChange:Function,onCompanyChange:Function}){
    
        const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)
        const [selectedCompany, setSelectedCompany] = useState<string|null>(null);
        const [companyJson, setCompanyJson] = useState<CompanyJson|null>(null);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const companies = await getCompanies();
                    setCompanyJson(companies);
                } catch (error) {
                    console.error('Failed to fetch companies:', error);
                }
            };
    
            fetchData();
        }, []);
    return(
        <form className="bg-slate-100 rounded-lg space-x-5 space-y-2 
        w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" value={reserveDate} 
                onChange={(value)=>{setReserveDate(value);onDateChange(value)}}/>
            </LocalizationProvider>

            <Select variant="standard" name='location' id='location'
            className="h-[2em] w-[200px]" value={selectedCompany}
            onChange={(event)=>{ const value = event.target.value; setSelectedCompany(value);onCompanyChange(value)}}>
                {
                    companyJson && companyJson.data.map((CompanyItem:CompanyItem)=>(
                        <MenuItem key={CompanyItem.id} value={CompanyItem.id}>
                            {CompanyItem.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </form>
    )
}