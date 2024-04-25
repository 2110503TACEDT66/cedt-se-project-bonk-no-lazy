export default async function deleteReview(token:string, Id:string){
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/${Id}`,{
        method:'DELETE',
        headers:{
            authorization: `Bearer ${token}`,
        },
    })
    if(!response.ok){
        throw new Error('Failed to delete review');
    }
    return await response.json();

}