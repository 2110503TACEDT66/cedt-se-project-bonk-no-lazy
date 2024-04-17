'use client'

import getReviewsByCompanyId from "@/libs/getReviewsByCompanyId";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

export default function ReviewCatalog({companyId}:{companyId:string}) {

    const [reviews, setReviews] = useState<ReviewJson | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviewsByCompanyId(companyId)
                setReviews(response)
            } catch (error) {
                console.error("Error fetching reviews: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [companyId])

    if (loading) {
        return <div>Loading...<LinearProgress/></div>
    }

    if (!reviews || !reviews.success) {
        return <div>Error fetching reviews</div>
    }

    console.log(reviews)

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

