export default async function getReviewsByCompanyId(CompanyId:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews?company=${CompanyId}`)
    if(!response.ok){
        throw new Error('Failed to fetch reviews')
    }
    return await response.json();

}