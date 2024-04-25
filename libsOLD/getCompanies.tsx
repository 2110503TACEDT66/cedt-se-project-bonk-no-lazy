export default async function getCompanies(){
    await new Promise((resolve)=>setTimeout(resolve,1000))

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`)
    if(!response.ok){
        throw new Error('Failed to fetch companies')
    }
    return await response.json();
}