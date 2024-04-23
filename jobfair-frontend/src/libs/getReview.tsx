export default async function getReview(ReviewId:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/${ReviewId}`)
    if(!response.ok){
        throw new Error('Failed to fetch review')
    }
    return await response.json();

}