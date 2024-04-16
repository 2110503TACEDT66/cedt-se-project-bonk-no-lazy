export default async function getReviews() {

    const response = await fetch("https://cedt-se-project-bonk-no-lazy-backend.vercel.app/api/v1/reviews")
    if(!response.ok){
        throw new Error('Failed to fetch reviews')
    }
    return await response.json();
    
}