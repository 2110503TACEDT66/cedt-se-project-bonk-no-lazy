export default async function addInterview(token:string, id:string, json:JSON){
    const response = await fetch(`https://cedt-se-project-bonk-no-lazy-backend.vercel.app/api/v1/companies/${id}/interviews/`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(json),
    })
    if(!response.ok){
        throw new Error('Failed to create interview')
    }
    return await response.json()
}