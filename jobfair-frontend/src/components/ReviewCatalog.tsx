'use client'

import getReviewsByCompanyId from "@/libs/getReviewsByCompanyId";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import Rating from '@mui/material/Rating';

export default function ReviewCatalog({companyId, addComment}:{companyId:string, addComment:any}) {

    function timeElapsedString(datetime: Date, full: boolean = false): string {
        const now = new Date();
        const ago = new Date(datetime);
        const diff = Math.abs(now.getTime() - ago.getTime());
    
        const intervals: [number, string][] = [
            [Math.floor(diff / (1000 * 60 * 60 * 24 * 365)), 'year'],
            [Math.floor(diff / (1000 * 60 * 60 * 24 * 30)), 'month'],
            [Math.floor(diff / (1000 * 60 * 60 * 24 * 7)), 'week'],
            [Math.floor(diff / (1000 * 60 * 60 * 24)), 'day'],
            [Math.floor(diff / (1000 * 60 * 60)), 'hour'],
            [Math.floor(diff / (1000 * 60)), 'minute'],
            [Math.floor(diff / 1000), 'second']
        ];
    
        const result = intervals.filter(([value]) => value > 0).map(([value, unit]) => `${value} ${unit}${value !== 1 ? 's' : ''}`);
    
        if (!full) {
            return result.slice(0, 1).join(', ') + ' ago';
        }
    
        return result.length > 0 ? result.join(', ') + ' ago' : 'just now';
    }

    const [reviews, setReviews] = useState<ReviewJson | null>(null)
    const [loading, setLoading] = useState(true)
    const [totalRating, setTotalRating] = useState(0);

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
    }, [companyId, addComment])

    useEffect(() => {
        if (reviews && reviews.success) {
            let total = 0;
            reviews.data.forEach((review) => {
                total += review.rating;
            });
            setTotalRating(total);
        }
    }, [reviews]);

    if (loading) {
        return <div>Loading...<LinearProgress/></div>
    }

    if (!reviews || !reviews.success) {
        return <div>Error fetching reviews</div>
    }

    console.log(reviews)

    return(
        <div>    
            <div className="bg-slate-200 rounded py-2 my-2 rounded-lg grid grid-rows-1 grid-cols-3 justify-center w-full">
                    <span className="text-xl text-black font-bold m-2 ml-4 justify-self-start">
                        Company Rating
                    </span>
                    <div className="justify-self-center flex flex-row">
                        <div className="text-3xl text-yellow-500 font-bold my-[0.2em]">
                            {
                                reviews.count == 0 ?
                                <span className="text-gray-500">N/A</span>
                                :
                                Math.round(((totalRating/reviews.count) + Number.EPSILON) * 10) / 10
                            }
                        </div>
                        <div className="m-2 mt-[0.6em]">
                            {
                                reviews.count == 0 ?
                                <Rating name="read-only" value={0} readOnly size="large"/> 
                                :
                                <Rating name="read-only" value={totalRating/reviews.count} precision={0.1} readOnly size="large"/>
                            }
                        </div>
                    </div>
                    <span className="text-m text-gray-500 m-2 mr-4 mt-[0.8em] justify-self-end">
                        {reviews.count} reviews
                    </span>
            </div>
        {   
            reviews.data.map((ReviewItem:ReviewItem) => (
                
                <div className="bg-slate-200 rounded py-2 my-2 rounded-lg flex flex-row text-left w-full" key={ReviewItem._id}>
                    {
                        <>
                            <div className="flex mx-5 my-3">
                                <Image 
                                    src={ReviewItem.user.profile_picture}
                                    alt="Profile Picture"
                                    width={0} height={0} sizes="100vw"
                                    className="rounded-full w-[50px] h-[50px] shadow-md shadow-slate-500/50"
                                />
                                <div className="flex flex-col ml-5">
                                    <div className="mt-[-0.2em] ml-[-0.2em] text-gray-800">
                                        <span className="text-xl font-bold">{ReviewItem.user.name} </span>
                                        <span className="text-sm text-gray-500 mx-[0.2em]">{timeElapsedString(ReviewItem.createdAt)}</span>
                                    </div>
                                    <div className="flex ml-[-0.3em]">
                                        <Rating name="read-only" value={ReviewItem.rating} readOnly />
                                    </div>
                                    <div className="text-m my-2 text-black font-semibold">{ReviewItem.comment} </div>
                                </div>
                            </div>
                        </>
                    }
                
                </div>
        
        ))
        }
        </div>
    )
} 

