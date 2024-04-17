export default async function getReview(ReviewId:string) {

    const response = await fetch(`https://cedt-se-project-bonk-no-lazy-backend.vercel.app/api/v1/reviews/${ReviewId}`)
    if(!response.ok){
        throw new Error('Failed to fetch review')
    }
    return await response.json();

}