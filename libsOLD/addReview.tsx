export default async function addReview(token:string, id:string, json:JSON) {

    // JSON Format 
    // {
    //     "rating": Number,
    //     "comment": String
    // }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}/reviews`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(json),
    })
    if(!response.ok){
        throw new Error('Failed to create review')
    }
    return await response.json()

}