'use client'

import Image from "next/image"
import getCompany from "@/libs/getCompany";
import getReviewsByCompanyId from "@/libs/getReviewsByCompanyId";
import Link from "next/link";
import { Button, LinearProgress, Rating, TextField } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import ReviewCatalog from "@/components/ReviewCatalog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview";

export default function CompanyDetailPage({params}:{params:{cid:string}}){
    const {data:session} = useSession();

    const reviews = getReviewsByCompanyId(params.cid)
    const [comment,setComment] = useState<string>('');
    const [ratingValue,setRatingValue] = useState(0);
    const AddComment = () =>{
        var token = ''
        if (session) {
            token = session.user.token
        }
        else{ alert('no session token')}
        if(comment && ratingValue){
            const item:any = {
                rating:ratingValue,
                comment: comment,
            }
            addReview(token,params.cid,item).then(()=>{
                alert('add comment complete')
                setComment('');
                setRatingValue(0);
            }).catch((error:Error)=>{
                console.error("Add Comment Failed",error)
                alert("Add Comment Failed")
            })
        }else{
            alert('comment or rating are not fulfilled')
            console.log(comment);
            console.log(ratingValue);   
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
    }, [params.cid,AddComment]);

    if (!companyDetail) {
        return <div>Loading...<LinearProgress/></div>;
    }
    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium "> Company: {companyDetail.data.name}</h1>
            <div className="flex flex-row ">
                <Image src={companyDetail.data.quote}
                alt="company Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black shadow-xl shadow-slate-500/50"
                />
                <div className="text-md mx-5 text-left"> 
                <h3 className="text-lg font-bold">
                {companyDetail.data.name}
                </h3>
                    <div>Description : {companyDetail.data.description}</div>
                    <div>Address : {companyDetail.data.address}</div>
                    <div>
                    Website :
                    <Link href={companyDetail.data.website} className="hover:text-sky-400"> {companyDetail.data.website}</Link>
                    </div>
                    <div>Tel. : {companyDetail.data.tel}</div>
                    <Link href={`/booking?id=${params.cid}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm ">
                             Make Booking
                        </button>
                    </Link>
                    <Rating value={ratingValue} className=""  onChange={(e, newValue) => handleRatingChange(newValue)}/>
                    <TextField variant="standard" label='add your comment'  className="m-5" onChange={(e)=>setComment(e.target.value)} value={comment}/>
                    <Button name='submit' 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full align-left "
                    onClick={AddComment}>
                    add review
                    </Button>
                    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                        <ReviewCatalog companyId={params.cid}/>
                    </Suspense>
                </div>
            </div>
        </main>
    )
}