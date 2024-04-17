export default async function getReviewsByCompanyId(CompanyId:string) {

    const response = await fetch(`https://cedt-se-project-bonk-no-lazy-backend.vercel.app/api/v1/reviews?company=${CompanyId}`)
    if(!response.ok){
        throw new Error('Failed to fetch reviews')
    }
    return await response.json();

}