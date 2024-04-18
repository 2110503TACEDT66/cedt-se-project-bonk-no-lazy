export default async function getInterview(token:string, Id:string){
    
    const response = await fetch(`https://cedt-se-project-bonk-no-lazy-backend.vercel.app/api/v1/interviews/${Id}`,{
        method:'GET',
        headers:{
            authorization: `Bearer ${token}`,
        },
    })
    if(!response.ok){
        throw new Error('Failed to fetch interview');
    }
    return await response.json();

}