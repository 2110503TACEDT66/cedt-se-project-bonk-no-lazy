export default async function updateReview(token:string, id:string, json:JSON) {

    // JSON Format 
    // {
    //     "rating": Number,
    //     "comment": String
    // }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/${id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(json),
    })
    if(!response.ok){
        throw new Error('Failed to update review')
    }
    return await response.json()

}