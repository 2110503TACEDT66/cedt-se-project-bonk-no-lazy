export default async function getInterviews(token:string) {
    const response = await fetch('https://jobfair-backend.vercel.app/api/v1/interviews',{
        method:'GET',
        headers:{
            authorization: `Bearer ${token}`,
        },
    })
    if(!response.ok){
        throw new Error('Failed to fetch interviews')
    }
    return await response.json();
}