export default async function getReviews() {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews`)
    if(!response.ok){
        throw new Error('Failed to fetch reviews')
    }
    return await response.json();
    
}