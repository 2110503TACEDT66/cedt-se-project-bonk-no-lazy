'use client'
import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react"
import getInterview from "@/libs/getInterview"
import getInterviews from "@/libs/getInterviews"
import deleteInterview from "@/libs/deleteInterview"
import { useState } from "react"
import DateReserve from "./DateReserve"
import { Dayjs } from "dayjs"
import dayjs from "dayjs"
import updateInterview from "@/libs/updateInterview"

export default function BookingList({user, interviewJson, token} : {user:userJSON, interviewJson:BookingJson, token:string}){

    console.log(user)

    const [interviews, setInterviews] = useState(interviewJson.data);
    const [interviewDate,setinterviewDate] = useState<Dayjs|null>(null)
    const [chooseCompany, setchooseCompany] = useState<string|null>(null);

    const handleCancelBooking = async (interviewId: string) => {
        try {
            await deleteInterview(token, interviewId);
            // Remove the canceled interview from the state
            var interviewsPromise = await getInterviews(token);
            var newInterviews = await interviewsPromise
            setInterviews(newInterviews.data);
            alert("Successfully cancelled interview");
        } catch (error) {
            console.error("Failed to cancel interview", error);
            alert("Failed to cancel interview");
        }
    };

    const handleUpdateBooking = async (interviewId:string) => {
        try {
            const item:any = {
                interviewDate: dayjs(interviewDate).format('YYYY-MM-DD'),
                company: chooseCompany
            }
            await updateInterview(token, interviewId, item);
            var interviewsPromise = await getInterviews(token);
            var newInterviews = await interviewsPromise
            setInterviews(newInterviews.data);
            alert("Successfully updated interview");
        } catch (error) {
            console.error("Failed to update interview", error);
            alert("Failed to update interview");
        }
    }
    if (interviewJson.count == 0) 
    return (
        <div className="text-center p-5">
            <h1 className="text-lg font-medium text-white"> No Interviews Yet</h1>
        </div>
    );
    return (
        <>      
        {   
            interviews.map((BookingItem) => (
                <div className="flex flex-row items-center justify-around flex-wrap p-1 text-center w-full h-full">
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 rounded-lg flex flex-row text-left w-4/5 " key={BookingItem._id}>
                    {
                        user.data._id === BookingItem.user && user.data.role !== 'admin' ?
                        <>
                            <button 
                                className="bg-blue-400 text-white hover:bg-sky-400 hover:text-gray-100 rounded p-5 m-5 "
                                onClick={() => handleCancelBooking(BookingItem._id)}>
                                Cancel Booking
                            </button>

                            <button 
                                className="bg-blue-400 text-white hover:bg-sky-400 hover:text-gray-100 rounded p-5 m-5 "
                                onClick={() => handleUpdateBooking(BookingItem._id)}>
                                Update Booking
                        </button>

                            <DateReserve 
                                onDateChange={(value:Dayjs)=>{setinterviewDate(value)}} 
                                onCompanyChange={(value:string)=>{setchooseCompany(value)}} 
                            />
                            
                            <div className="m-5">
                            <div className="text-sm m-2 text-black font-semibold">Selected Company : {BookingItem.company.name} </div>
                            <div className="text-sm m-2 text-black font-semibold">Booking Date : {BookingItem.interviewDate} </div>
                            <div className="text-sm m-2 text-black font-semibold">Name : {BookingItem.name} </div>
                            </div>
                        </>:''
                    }
                    {
                        user?.data.role === 'admin'?
                        <>
                            <button 
                                className="bg-blue-400 text-white hover:bg-sky-400 hover:text-gray-100 rounded p-5 m-5 "
                                onClick={() => handleCancelBooking(BookingItem._id)}>
                                Cancel Booking
                            </button>

                            <button 
                                className="bg-blue-400 text-white hover:bg-sky-400 hover:text-gray-100 rounded p-5 m-5 "
                                onClick={() => handleUpdateBooking(BookingItem._id)}>
                                Update Booking
                            </button>

                            <DateReserve 
                                onDateChange={(value:Dayjs)=>{setinterviewDate(value)}} 
                                onCompanyChange={(value:string)=>{setchooseCompany(value)}} 
                            />
                        
                            <div className="m-5">
                            <div className="text-sm m-2 text-black font-semibold">Selected Company : {BookingItem.company.name} </div>
                            <div className="text-sm m-2 text-black font-semibold">Booking Date : {BookingItem.interviewDate} </div>
                            <div className="text-sm m-2 text-black font-semibold">Name : {BookingItem.name} </div>
                            </div>
                        </>:''
                    }
                </div>
                </div>
        
        ))
        }
        </>
    )
}