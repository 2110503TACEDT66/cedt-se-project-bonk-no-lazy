export default async function updateInterview(token:string, id:string, json:JSON){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/interviews/${id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(json),
    })
    if(!response.ok){
        throw new Error('Failed to update interview')
    }
    return await response.json()
}