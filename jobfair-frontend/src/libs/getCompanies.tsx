export default async function getCompanies(){
    await new Promise((resolve)=>setTimeout(resolve,1000))

    const response = await fetch("https://cedt-se-project-bonk-no-lazy-backend.vercel.app/api/v1/companies")
    if(!response.ok){
        throw new Error('Failed to fetch companies')
    }
    return await response.json();
}