export default async function deleteInterview(token:string, Id:string){
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/interviews/${Id}`,{
        method:'DELETE',
        headers:{
            authorization: `Bearer ${token}`,
        },
    })
    if(!response.ok){
        throw new Error('Failed to delete interview');
    }
    return await response.json();

}