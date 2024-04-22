export default async function getReviewsByUserId(UserId:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews?user=${UserId}`)
    if(!response.ok){
        throw new Error('Failed to fetch reviews')
    }
    return await response.json();

}