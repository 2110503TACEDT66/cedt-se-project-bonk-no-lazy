'use client'

import { TextField,Select,MenuItem, Button} from "@mui/material"
import DateReserve from "@/components/DateReserve"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useState,useEffect } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addBooking } from "@/redux/features/bookSlice"
import { useSession } from "next-auth/react"
import addInterview from "@/libs/addInterview"

export default function Booking() {
    const {data:session} = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const MakeBooking = () =>{
        var token = ''
        if (session) {
            token = session.user.token
        }
        if(fname && lastname && citizenID && interviewDate && chooseCompany){
            var date = dayjs(interviewDate).format('YYYY-MM-DD')
            const item:any = {
                interviewDate: date,
                name: fname + ' ' + lastname
            }
            addInterview(token, chooseCompany, item).then( () => {
                alert('Booking Interview Successful')
                setFName('')
                setLastname('')
                setCitizenID('')
                setinterviewDate(null)
                setchooseCompany(null)
            }).catch( (error:Error)  => {
                console.error("Booking Interview Failed", error)
                alert("Booking Interview Failed")
            })
        }
    }

    const [interviewDate,setinterviewDate] = useState<Dayjs|null>(null)
    const [chooseCompany, setchooseCompany] = useState<string|null>(null);
    const [fname, setFName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [citizenID, setCitizenID] = useState<string>('');

    return(
        <main className="w-[100%] flex flex-col items-center space-y-10">
            <div className="text-2xl font-medium text-center text-teal-500 mt-8 transition transform duration-150 hover:text-cyan-900">
                Interview Session Booking
            </div>
            <div className=" bg-blue-200 p-10 rounded-lg ring-2 items-center flex flex-col">
            <div className="table-auto border-seperate border-spacing-10">
                <table className="p-10">
                    <tr >
                        <td className="px-20 py-2">
                        <TextField 
                            variant="standard" 
                            name='Name' 
                            label='Name'
                            value={fname}
                            onChange={(e)=> setFName(e.target.value)}></TextField>
                        </td>
                        <td className="px-20 py-2">
                        <TextField 
                            variant="standard" 
                            name='Lastname' 
                            label='Lastname'
                            value={lastname}
                            onChange={(e)=> setLastname(e.target.value)}></TextField>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-20 py-2">
                        <TextField 
                            variant="standard" 
                            name='Citizen ID' 
                            label='Citizen ID'
                            value={citizenID}
                            onChange={(e)=> setCitizenID(e.target.value)}></TextField>
                        </td>
                    </tr>
                </table> 
            </div>
            <div className="p-10">
            <div className="text-black">
                Pick a Date between 05-10-2022 and 05-13-2022
            </div>
            <DateReserve 
                onDateChange={(value:Dayjs)=>{setinterviewDate(value)}} 
                onCompanyChange={(value:string)=>{setchooseCompany(value)}} />
            </div>
            <Button name='Book Vaccine' 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full align-left "
            onClick={MakeBooking}>
                Book Interview Sessions
            </Button>
            </div>
            
        </main>
    )
}

