'use client'

import Image from "next/image"
import getCompany from "@/libs/getCompany";
import Link from "next/link";
import { Button, LinearProgress, Rating, TextField } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import ReviewCatalog from "@/components/ReviewCatalog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview";
import getReviewsByCompanyId from "@/libs/getReviewsByCompanyId";

export default function CompanyDetailPage({params}:{params:{cid:string}}){
    const {data:session} = useSession();

    const [comment,setComment] = useState<string>('');

    const [ratingValue,setRatingValue] = useState(0);

    const AddComment = () =>{
        var token = ''
        if (session) {

            token = session.user.token

            if (comment && ratingValue) {
                const item:any = {
                    rating: ratingValue,
                    comment: comment,
                }
                addReview(token, params.cid, item).then(()=>{
                    alert('Comment added')
                    setComment('');
                    setRatingValue(0);
                }).catch((error:Error)=>{
                    console.error("Failed to add comment",error)
                    alert("Failed to add comment")
                })
            } else {
                alert('comment or rating are not fulfilled')
                console.log(comment);
                console.log(ratingValue);   
            }
        }
        else { 
            alert('Please login first')
        }
    }

    const handleRatingChange = (newValue: number | null) => {
        setRatingValue(newValue || 0); // If newValue is null, set it to 0
      };
      
    
    const [companyDetail, setCompanyDetail] = useState<any>(null);

    useEffect(() => {
        const fetchCompany = async () => {
            const data = await getCompany(params.cid);
            setCompanyDetail(data);
        };

        fetchCompany();
    }, [params.cid]);

    if (!companyDetail) {
        return <div>Loading...<LinearProgress/></div>;
    }
    return(
        <main className="p-5">
            <div className="flex flex-col">
                <div className="flex flex-col text-md mx-5 flex-auto text-center mb-5"> 
                    <div className="bg-slate-200 rounded rounded-b-lg rounded-t-xl flex flex-col text-center w-full shadow-2xl shadow-slate-400/50">
                        <Image 
                            src={companyDetail.data.quote}
                            alt="company Picture"
                            width={0} height={0} sizes="100vw"
                            className="rounded-t-lg w-full h-[70vh] bg-black flex-auto object-cover mb-2"
                        />
                        <h3 className="text-lg font-bold text-black"> {companyDetail.data.name}</h3>
                        <div className="text-black">{companyDetail.data.description}</div>
                        <div className="text-black">{companyDetail.data.address}</div>
                        <div className="text-black">
                            <Link href={companyDetail.data.website} className="hover:text-sky-400"> {companyDetail.data.website}</Link>
                        </div>
                        <div className="text-black">{companyDetail.data.tel}</div>
                        <Link href={`/booking?id=${params.cid}`} className="flex justify-center m-2">
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm ">
                                Make Booking
                            </button>
                        </Link>
                    </div>
                    <div className="bg-slate-200 rounded pt-2 mt-2 rounded-lg flex justify-center text-left w-full">
                        <div className="flex-col py-2 my-2 w-4/5">
                            <div className="w-full mb-2">
                                <TextField variant="standard" label='Add your comment' className="w-full m-2" onChange={(e)=>setComment(e.target.value)} value={comment}/>
                            </div>
                            <div className="flex justify-center mt-5 mb-3">
                                <Rating value={ratingValue} onChange={(e, newValue) => handleRatingChange(newValue)} size="large"/>
                            </div>
                            <div className="flex justify-center">
                                <Button 
                                    name='submit' 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
                                    onClick={AddComment}>
                                    add review
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                        <ReviewCatalog companyId={params.cid} addComment={AddComment}/>
                    </Suspense>
                </div>
            </div>
        </main>
    )
}