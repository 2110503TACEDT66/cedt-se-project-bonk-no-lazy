import getReviewsByCompanyId from "@/libs/getReviewsByCompanyId";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

export default async function ReviewCatalog({companyId}:{companyId:string}){

    const reviews = await getReviewsByCompanyId(companyId);
    
    if (!reviews) {
        return <div>Loading...<LinearProgress/></div>
    }

    return(
        <div>      
        This company has {reviews.count} reviews.
        {   
            reviews.data.map((ReviewItem:ReviewItem) => (
                
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 rounded-lg flex flex-row text-left w-full " key={ReviewItem._id}>
                    {
                        <>
                            <div className="m-5">
                            <div className="text-sm m-2 text-black font-semibold">Name : {ReviewItem.user.name} </div>
                            <div className="text-sm m-2 text-black font-semibold">Rating : {ReviewItem.rating} </div>
                            <div className="text-sm m-2 text-black font-semibold">Comment : {ReviewItem.comment} </div>
                            </div>
                        </>
                    }
                
                </div>
        
        ))
        }
        </div>
    )
} 

